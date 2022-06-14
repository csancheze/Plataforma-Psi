const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Terapeuta, Areas, Modelos, Paciente, Posts, Servicios, Dia, Hora, ModelosT, ServiciosT } = require('../models');
const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const horas = ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00", "20:00","21:00"]

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) {
                console.log("El context es: " + context.user)
                throw new AuthenticationError('Please, log in!');
            }
            const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password');
            switch (userData.role) {
                case "Paciente":
                    const pacienteData = await Paciente.findOne({ _id: context.user._id })
                        .select('-__v -password')
                        .populate('terapeuta')
                        
                    return { user: userData, paciente: pacienteData };

                case "Terapeuta":
                    const terapeutaData = await Terapeuta.findOne({ _id: context.user._id })
                        .select('-__v -password')
                        .populate('modelos')
                        .populate('areas')
                        .populate('servicios')
                        .populate('areas')
                        .populate('posts')
                        .populate('pacientes')
                        .populate('formacion')
                        
                    return { user: userData, terapeuta: terapeutaData };
                default:
                    console.log(`Sorry, we are out of profiles`);
            };

        },

        terapeutaHorarios: async (parent, args, context) => {
            const terapeutaData = await Terapeuta.findOne({ _id: context.user._id })
                        .select('-__v -password')
                        .populate([{
                            path: 'dias',
                            populate: {
                                path: 'horas',
                                model: 'Hora'
                            }
                        }])
                        
                    return {terapeuta: terapeutaData };
        },
        terapeuta: async (parent, args, context) => {
            const terapeutaData = await Terapeuta.findById(args._id)
                .populate('modelos')
                .populate('areas')
                .populate('servicios')
                .populate('areas')
                .populate('posts')
                .populate('dias')
                .populate('formacion')
                .populate([{
                    path: 'dias',
                    populate: {
                        path: 'horas',
                        model: 'Hora'
                    }
                }])
            return terapeutaData
        },

        areas: async (parent, args, context) => {
            const areas = await Areas.find({})
            return areas
        },
        servicios: async (parent, args, context) => {
            const servicios = await Servicios.find({})
            return servicios
        },
        modelos: async (parent, args, context) => {
            const modelos = await Modelos.find({})
            return modelos
        },

    },

    Mutation: {
        addPaciente: async (parent, args, context) => {
            try {
                const pacienteUser = await User.create(args);
                const pacienteToken = signToken(pacienteUser);
                const pacienteData = await Paciente.create({
                    _id: pacienteUser._id,
                    nombre: args.nombre,
                    correo: args.correo,
                    terapeuta: context.user._id,
                })
                const terapeutaData = await Terapeuta.findByIdAndUpdate(context.user._id, {
                    $push: {pacientes: pacienteData}
                })
                console.log(terapeutaData)
                return { token: pacienteToken, user: pacienteUser, paciente: pacienteData };
            } catch (err) {
                console.log(err);
            }

        },

        addDia: async (parent, args) => {
            const diasData = await Dia.create({name: args.name})
            return diasData
        },

        addHora: async (parent, args) => {
            const horas = await Hora.create({tiempo: args.tiempo})
            return horas
        },

        addTerapeuta: async (parent, args) => {
            try {

                const terapeutaUser = await User.create(args);
                const terapeutaToken = signToken(terapeutaUser);
                const terapeutaData = await Terapeuta.create({
                    _id: terapeutaUser._id,
                    nombre: args.nombre,
                    titulo: args.titulo,
                    correo: args.correo,
                    cedula: args.cedula,
                    foto: args.foto,
                    bio: args.bio,
                    areas: args.areas,
                })
                for (let i = 0; i < args.modelosName.length; i++) {
                    const modelosTData = await ModelosT.create({name: args.modelosName[i], description: args.modelosDescription[i]})
                    const terapeutaModelosData = await Terapeuta.findByIdAndUpdate(terapeutaData._id, {
                        $push: {modelos: modelosTData}
                    })
                }
                for (let i = 0; i < args.serviciosName.length; i++) {
                    const serviciosTData = await ServiciosT.create({name: args.serviciosName[i]})
                    const terapeutaModelosData = await Terapeuta.findByIdAndUpdate(terapeutaData._id, {
                        $push: {servicios: serviciosTData}
                    })
                }

                for (let i = 0; i < dias.length; i++) {
                    const diasData = await Dia.create({name: dias[i]})
                    const terapeutaDiadata = await Terapeuta.findByIdAndUpdate(terapeutaData._id, {
                        $push: {dias: diasData}
                    })
                    for (let j = 0; j < horas.length; j++) {
                        const horaData = await Hora.create({tiempo: horas[j]})
                        const diaData = await Dia.findByIdAndUpdate(diasData._id, {
                            $push: {horas: horaData}
                        })
                    }
                }

                return { token: terapeutaToken, user: terapeutaUser, terapeuta: terapeutaData };
            } catch (err) {
                console.log(err);
            }

        },
        
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Credentials are not valid')
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Credentials are not valid')
            }
            const token = signToken(user);
            switch (user.role) {
                case "Paciente":
                    const pacienteData = await Paciente.findOne({ _id: user._id });
                    return { token, user, paciente: pacienteData };
                case "Terapeuta":
                    const terapeutaData = await Terapeuta.findOne({ _id: user._id });
                    return { token, user, terapeuta: terapeutaData };
                default:
                    console.log(`Sorry, we are out of profiles`);
            }
        },

        addServicio: async (parent, args) => {
            const servicio = await Servicios.create(args);
            return servicio;
        },
        addArea: async (parent, args) => {
            const area = await Areas.create(args);
            return area;
        },
        addModelo: async (parent, args) => {
            const modelo = await Modelos.create(args);
            return modelo;
        },
        addPost: async (parent, args) => {
            const Post = await Posts.create(args);
            return Post;
        },
        updateDia: async (parent, args) => {
            let activo = args.active
            activo ? activo = false : activo = true
            const dia = await Dia.findByIdAndUpdate(args.diaId, {
                active: activo
            })
            return dia
        },
        updateHora: async (parent, args) => {
            let activo = args.active
            activo ? activo = false : activo = true
            const hora = await Hora.findByIdAndUpdate(args.horaId, {
                active: activo
            })
            return hora
        },
        updateTerapeuta: async (parent, args, context) => {
            const terapeutaData = await Terapeuta.findByIdAndUpdate(context.user._id, {
                nombre: args.nombre,
                titulo: args.titulo,
                correo: args.correo,
                cedula: args.cedula,
                foto: args.foto,
                bio: args.bio,
            })
            return terapeutaData
        },
        addModeloTerapeuta: async(parent,args,context) => {
            const newModelo= await ModelosT.create({name: args.name, description: args.description})
            const terapeutaData = await  Terapeuta.findByIdAndUpdate(context.user._id, {
                $push: {modelos: newModelo}
            })
            return terapeutaData
        },
        addServicioTerapeuta: async(parent,args,context) => {
            const newServicio = await ServiciosT.create({name: args.name})
            const terapeutaData = await  Terapeuta.findByIdAndUpdate(context.user._id, {
                $push: {servicios: newServicio}
            })
            return terapeutaData
        },
        updateCost: async(parent,args,context) => {
            const servicioData = await ServiciosT.findByIdAndUpdate(args.servicioId,{
                costo: args.cost
            })
            return servicioData
        },
        updateDescription: async(parent,args,context) => {
            const servicioData = await ModelosT.findByIdAndUpdate(args.modeloId,{
                description: args.description
            })
            return servicioData
        },
        addAreaTerapeuta: async(parent,args,context) => {
            const terapeutaData = await  Terapeuta.findByIdAndUpdate(context.user._id, {
                $push: {areas: args.areaId}
            })
            return terapeutaData
        },
        deleteModelo: async (parent, args, context) => {
            const user = await Terapeuta.findByIdAndUpdate({ _id: context.user._id }, {
                $pull: { modelos: args.modeloId }
            })
            const modelo = await ModelosT.deleteOne({_id: args.modeloId})
            return {user, modelo}
        },
        deleteServicio: async (parent, args, context) => {
            const user = await Terapeuta.findByIdAndUpdate({ _id: context.user._id }, {
                $pull: { servicios: args.servicioId }
            })
            const servicio = await ServiciosT.deleteOne({_id: args.serviciosId})
            return {user, servicio}
        },
        deleteArea: async (parent, args, context) => {
            const user = await Terapeuta.findByIdAndUpdate({ _id: context.user._id }, {
                $pull: { areas: args.areaId }
            })
            return {user}
        },


    
    }

}

module.exports = resolvers;
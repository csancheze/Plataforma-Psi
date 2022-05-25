const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Terapeuta, Areas, Modelos, Paciente, Posts, Servicios, Dia, Hora } = require('../models');
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
                        .populate('dias')
                        .populate([{
                            path: 'dias',
                            populate: {
                                path: 'horas',
                                model: 'Hora'
                            }
                        }])
                        
                    return { user: userData, terapeuta: terapeutaData };
                default:
                    console.log(`Sorry, we are out of profiles`);
            };

        },
        terapeuta: async (parent, args, context) => {
            const terapeutaData = await Terapeuta.findById(args._id)
                .populate('modelos')
                .populate('areas')
                .populate('servicios')
                .populate('areas')
                .populate('posts')
                .populate('dias')
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
                    correo: args.correo,
                    cedula: args.cedula,
                    bio: args.bio,
                    modelos: args.modelos,
                    servicios: args.servicios,
                    areas: args.areas,
                })
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
                        console.log(diaData)
                    }
                    console.log(terapeutaDiadata)
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
                correo: args.correo,
                cedula: args.cedula,
                bio: args.bio,
                modelos: args.modelos,
                servicios: args.servicios,
                areas: args.areas,
            })
            return terapeutaData
        }
    
    }

}

module.exports = resolvers;
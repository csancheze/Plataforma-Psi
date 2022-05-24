const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Terapeuta, Areas, Modelos, Paciente, Posts, Servicios } = require('../models');

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
                        .populate('modelo')
                        .populate('areas')
                        .populate('servicios')
                        .populate('areas')
                        .populate('posts')
                        .populate('pacientes')
                    return { user: userData, terapeuta: terapeutaData };
                default:
                    console.log(`Sorry, we are out of profiles`);
            };

        },
        terapeuta: async (parent, args, context) => {
            const terapeutaData = await Terapeuta.findById(args._id)
                .populate('modelo')
                .populate('areas')
                .populate('servicios')
                .populate('areas')
                .populate('posts')
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
        addPaciente: async (parent, args) => {
            try {
                const pacienteUser = await User.create(args);
                const pacienteToken = signToken(pacienteUser);
                const pacienteData = await Paciente.create({
                    _id: pacienteUser._id,
                    nombre: args.nombre,
                    email: args.correo,
                    terapeuta: args.terapeuta,
                })
                return { token: pacienteToken, user: pacienteUser, paciente: pacienteData };
            } catch (err) {
                console.log(err);
            }

        },

        addTerapeuta: async (parent, args) => {
            try {

                const terapeutaUser = await User.create(args);
                const terapeutaToken = signToken(terapeutaUser);
                const terapeutaData = await Terapeuta.create({
                    _id: terapeutaUser._id,
                    nombre: args.nombre,
                    email: args.correo,
                    cedula: args.cedula,
                    bio: args.bio,
                    modelo: args.modelo,
                    servicios: args.servicios,
                    areas: args.areas,
                })
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
    
    }

}

module.exports = resolvers;
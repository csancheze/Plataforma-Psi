const { gql } = require('apollo-server-express');

const typeDefs = gql` 

    type User {
        _id: ID!
        username: String!
        email: String!
        role: String!
    }

   
    type Auth {
        token: ID!
        user: User
        terapeuta: Terapeuta
        paciente: Paciente
    }

    type Profile {
        user: User!
        terapeuta: Terapeuta
        paciente: Paciente
     }


    type Terapeuta {
        _id: ID
        nombre: String
        titulo: String
        correo: String
        cedula: String
        foto: String
        bio: String
        modelos: [ModelosT]
        servicios: [ServiciosT]
        areas: [Areas]
        formacion: [Diplomas]
        posts: [Posts]
        pacientes: [Paciente]
        dias: [Dia]
    }

    type Paciente {
        _id: ID
        nombre: String
        correo: String
        notas: [String]
    }

    type Diplomas {
        _id: ID
        titulo: String!
        imagen: String
    }

    type Modelos {
        _id: ID
        name: String!
        description: String
    }

    type ModelosT {
        _id: ID
        name: String!
        description: String
    }

    type Servicios {
        _id: ID
        name: String!
        costo: String
    }

    type ServiciosT {
        _id: ID
        name: String!
        costo: String
    }


    type Areas {
        _id: ID
        name: String!
    }

    type Posts {
        _id: ID
        title: String!
        content: String
        link: String
        image: String
        dateCreated: String
    }

    type Dia {
        _id: ID
        name: String
        horas: [Hora]
        active: Boolean
    }

    type Hora {
        _id: ID
        tiempo: String
        active: Boolean
    }

    type Query {
        me: Profile
        terapeuta(_id:ID!): Terapeuta
        areas: [Areas]
        servicios: [Servicios]
        modelos: [Modelos]
        terapeutaHorarios: Profile
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addPaciente(
            username: String!
            email: String!
            password: String!
            role: String!
            nombre: String
            correo: String
            ): Auth
        addTerapeuta(
            username: String!
            email: String!
            password: String!
            role: String!
            nombre: String
            titulo: String
            correo: String
            cedula: String
            foto: String
            bio: String
            modelosName: [String]
            modelosDescription: [String]
            serviciosName: [String]
            areas: [ID]
            ): Auth
        addDia(name: String!): Dia
        addServicio(name: String!): Servicios
        addArea(name: String!): Areas
        addHora(tiempo: String!): Hora
        addModelo(name: String!, description: String): Modelos
        addPost(title: String!, content: String, link: String, image: String, dateCreated: String ): Posts
        updateDia(diaId: ID!, active: Boolean): Dia
        updateHora(horaId: ID!, active: Boolean): Hora
        updateTerapeuta(
            nombre: String
            titulo: String
            correo: String
            cedula: String
            foto: String
            bio: String
        ): Terapeuta
        updateCost(
            servicioId: ID
            cost: String
        ): ServiciosT
        addModeloTerapeuta(name: String!, description: String): Terapeuta
        addServicioTerapeuta(name: String!): Terapeuta 
        addAreaTerapeuta(areaId: ID!): Terapeuta
        deleteModelo(modeloId: ID!): Terapeuta
        deleteServicio(servicioId: ID!): Terapeuta 
        deleteArea(areaId: ID!): Terapeuta
    }
`

module.exports = typeDefs;
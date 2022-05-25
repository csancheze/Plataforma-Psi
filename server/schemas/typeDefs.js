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
        nombre: String
        correo: String
        cedula: String
        bio: String
        modelos: Modelos
        servicios: [Servicios]
        areas: [Areas]
        posts: [Posts]
        pacientes: [Paciente]
        dias: [Dia]
    }

    type Paciente {
        nombre: String
        correo: String
        notas: [String]
    }
    
    type Modelos {
        name: String!
        description: String
    }

    type Servicios {
        name: String!
        costo: Int
    }

    type Areas {
        name: String!
    }

    type Posts {
        title: String!
        content: String
        link: String
        image: String
        dateCreated: String
    }

    type Dia {
        name: String
        horas: [Hora]
        active: Boolean
    }

    type Hora {
        tiempo: String
        active: Boolean
    }

    type Query {
        me: Profile
        terapeuta(_id:ID!): Terapeuta
        areas: [Areas]
        servicios: [Servicios]
        modelos: [Modelos]
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
            terapeuta: ID!
            ): Auth
        addTerapeuta(
            username: String!
            email: String!
            password: String!
            role: String!
            nombre: String
            correo: String
            cedula: String
            bio: String
            modelos: [ID]
            servicios: [ID]
            areas: [ID]
            ): Auth
        addServicio(name: String!, costo: Int):Servicios
        addArea(name: String!): Areas
        addPost(title: String!, content: String, link: String, image: String, dateCreated: String ): Posts
        updateDia: (diaId: ID!, active: Boolean): Dia
        updateHora: (horaId: ID!, active: Boolean): Hora
        updateTerapeuta(
            correo: String
            cedula: String
            bio: String
            modelos: [ID]
            servicios: [ID]
            areas: [ID]
        ): Terapeuta
    }
`

module.exports = typeDefs;
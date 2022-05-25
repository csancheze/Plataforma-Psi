import { gql } from '@apollo/client';

export const LOGIN_TERAPEUTA = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
        _id
        username
        email
        role
        }
        terapeuta {
        nombre
        correo
        _id
        }
        }
    }
`
export const LOGIN_PACIENTE = gql`
    mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
        _id
        username
        email
        role
        }
        paciente {
        _id
        nombre
        correo
        }
    }
}

`

export const ADD_PACIENTE = gql `
    mutation AddPaciente($username: String!, $email: String!, $password: String!, $role: String!, $nombre: String, $correo: String) {
        addPaciente(username: $username, email: $email, password: $password, role: $role, nombre: $nombre, correo: $correo) {
            token
            user {
            _id
            username
            email
            role
            }
            paciente {
            _id
            nombre
            correo
            notas
            }
        }
    }
`

export const ADD_TERAPEUTA = gql `
        mutation AddTerapeuta($username: String!, $email: String!, $password: String!, $role: String!, $nombre: String, $correo: String, $cedula: String, $bio: String, $modelos: [ID], $servicios: [ID], $areas: [ID]) {
        addTerapeuta(username: $username, email: $email, password: $password, role: $role, nombre: $nombre, correo: $correo, cedula: $cedula, bio: $bio, modelos: $modelos, servicios: $servicios, areas: $areas) {
            token
            user {
            _id
            username
            email
            role
            }
            terapeuta {
            _id
            nombre
            }
        }
    }
`
export const ADD_SERVICIO = gql `
    mutation AddServicio($name: String!, $costo: Int) {
        addServicio(name: $name, costo: $costo) {
            _id
            name
            costo
        }
    }
`

export const ADD_AREA = gql `
    mutation AddArea($name: String!) {
        addArea(name: $name) {
            _id
            name
        }
    }
`

export const ADD_MODELO = gql `
    mutation AddModelo($name: String!, $description: String) {
        addModelo(name: $name, description: $description) {
            _id
            name
            description
        }
    }
`

export const ADD_POST = gql `
    mutation AddPost($title: String!, $content: String, $link: String, $image: String, $dateCreated: String) {
        addPost(title: $title, content: $content, link: $link, image: $image, dateCreated: $dateCreated) {
            _id
            title
        }
    }
`

export const UPDATE_TERAPEUTA = gql `
    mutation UpdateTerapeuta($correo: String, $cedula: String, $bio: String, $modelos: [ID], $servicios: [ID], $areas: [ID]) {
        updateTerapeuta(correo: $correo, cedula: $cedula, bio: $bio, modelos: $modelos, servicios: $servicios, areas: $areas) {
            _id
            nombre
        }
    }
`

export const UPDATE_DIA = gql `
    mutation UpdateDia($diaId: ID!, $active: Boolean) {
        updateDia(diaId: $diaId, active: $active) {
            _id
            name
            active
        }
    }
`

export const UPDATE_HORA = gql `
    mutation UpdateHora($horaId: ID!, $active: Boolean) {
        updateHora(horaId: $horaId, active: $active) {
            _id
            tiempo
            active
        }
    }

`
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
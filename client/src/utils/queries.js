import { gql } from "@apollo/client";

export const QUERY_ME_TERAPEUTA = gql`
    query Me {
        me {
            user {
            username
            email
            role
            _id
            }
            terapeuta {
            nombre
            correo
            cedula
            bio
            modelos {
                _id
                name
                description
            }
            servicios {
                _id
                name
                costo
            }
            areas {
                _id
                name
            }
            posts {
                _id
                title
                content
                link
                image
                dateCreated
            }
            pacientes {
                _id
                nombre
                correo
                notas
            }
            dias {
                _id
                name
                horas {
                active
                _id
                tiempo
                }
                active
            }
            }
        } 
}
`
export const QUERY_ME_PACIENTE = gql `
    query Me {
        me {
            user {
            username
            email
            role
            _id
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
export const TERAPEUTA = gql `
    query Terapeuta($id: ID!) {
        terapeuta(_id: $id) {
            nombre
            correo
            cedula
            bio
            modelos {
            _id
            name
            description
            }
            servicios {
            _id
            name
            costo
            }
            areas {
            _id
            name
            }
            posts {
            _id
            title
            content
            image
            dateCreated
            link
            }
            dias {
            _id
            name
            horas {
                _id
                tiempo
                active
            }
            active
            }
        }
    }
`

export const AREAS = gql `
    query Areas {
        areas {
            _id
            name
        }
    }
`
export const SERVICIOS = gql `
    query Servicios {
        servicios {
            _id
            name
            costo
    }
    }
`
export const MODELOS = gql `
    query Modelos {
        modelos {
            _id
            name
            description
        }
    }
`
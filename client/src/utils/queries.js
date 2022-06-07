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
            _id
            nombre
            titulo
            correo
            cedula
            foto
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
            formacion {
                _id
                titulo
                imagen
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
export const QUERY_ME_HORARIOS = gql `
    query TerapeutaHorarios {
        terapeutaHorarios {
                terapeuta {
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
}
`
export const TERAPEUTA = gql `
    query Terapeuta($id: ID!) {
    terapeuta(_id: $id) {
            _id
            nombre
            titulo
            correo
            cedula
            foto
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
            formacion {
                _id
                titulo
                imagen
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
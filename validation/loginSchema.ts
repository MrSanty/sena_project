import * as Yup from "yup"

export const loginSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Correo electrónico no válido')
    .required('Correo electrónico es requerido'),
  password: Yup
    .string()
    .required('Contraseña es requerida')
})  
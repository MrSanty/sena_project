import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  type_doc: Yup
    .string()
    .required('El tipo de documento es requerido'),
  num_doc: Yup
    .string()
    .required('El número de documento es requerido'),
  email: Yup
    .string()
    .required('El correo electrónico es requerido'),
  first_name: Yup
    .string()
    .required('El primer nombre es requerido'),
  last_name: Yup
    .string()
    .required('El apellido es requerido'),
  password: Yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es requerida')
})  

export const userEditSchema = Yup.object().shape({
  type_doc: Yup
    .string()
    .required('El tipo de documento es requerido'),
  num_doc: Yup
    .string()
    .required('El número de documento es requerido'),
  email: Yup
    .string()
    .required('El correo electrónico es requerido'),
  first_name: Yup
    .string()
    .required('El primer nombre es requerido'),
  last_name: Yup
    .string()
    .required('El apellido es requerido')
})
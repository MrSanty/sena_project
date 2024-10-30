import * as Yup from "yup"

export const stockSchema = Yup.object().shape({
  code: Yup
    .string()
    .required('El código es requerido'),
  name: Yup
    .string()
    .required('El nombre es requerido'),
  description: Yup
    .string()
    .required('La descripción es requerida'),
  quantity: Yup
    .string()
    .required('La cantidad es requerida')
    .matches(/^[0-9]+$/, 'La cantidad debe ser un entero y positivo'),
  unit_type: Yup
    .string()
    .oneOf(["Cantidad", "Kilogramo", "Litro", "Metro"], 'El tipo de unidad no es válido')
    .required('El tipo de unidad es requerido')
})  
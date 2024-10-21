'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { userEditSchema } from "@/validation/userSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { updateUser } from "@/actions"
import toast from "react-hot-toast"
import { 
  DataUserType, 
  UpdateFormUser,
  UpdateUserServer 
} from "@/interfaces/UserData"

export const useUpdateUser = (data: DataUserType, onClose: () => void) => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateFormUser>({
    resolver: yupResolver(userEditSchema),
    defaultValues: {
      first_name: data.first_name!,
      last_name: data.last_name!,
      email: data.email,
      type_doc: data.type_doc,
      num_doc: data.num_doc
    }
  })

  const { mutate } = useMutation({
    mutationFn: async (data: UpdateUserServer) => {
      try {
        const response = await updateUser(data)
        return response
      } catch (error) {
        toast.dismiss("updateUser")
        toast.error("Error al actualizar el usuario")
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"]
      })

      toast.dismiss("updateUser")
      toast.success("Usuario actualizado correctamente")
      onClose()
    }
  })

  const onSubmit: SubmitHandler<UpdateFormUser> = ({
    first_name,
    last_name,
    email,
    type_doc,
    num_doc
  }) => {
    toast.loading("Actualizando usuario...", { id: "updateUser" })
    mutate({
      first_name,
      last_name,
      email,
      type_doc,
      num_doc,
      id: data.id
    })
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit
  }
}
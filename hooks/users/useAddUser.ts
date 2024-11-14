'use client'

import { CreateFormUser, CreateUserServer } from "@/interfaces/UserData"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { yupResolver } from "@hookform/resolvers/yup"
import { userSchema } from "@/validation/userSchema"
import { addUsers } from "@/actions/user/addUsers"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export const useAddUser = (onClose: () => void, company_id: number) => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateFormUser>({
    resolver: yupResolver(userSchema)
  })

  const { mutate } = useMutation({
    mutationFn: async (data: CreateUserServer) => {
      const response = await addUsers(data)
      return response
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ "users" ]
      })

      toast.dismiss("addUser")
      toast.success("Usuario agregado correctamente")
      onClose()
    },
    onError: (error: any) => {
      toast.dismiss("addUser")
      toast.error(error.message)
    }
  })

  const onSubmit = async ({
    first_name,
    last_name,
    email,
    password,
    type_doc,
    num_doc
  }: CreateFormUser) => {
    toast.loading("Agregando usuario...", { id: "addUser" })
    mutate({
      first_name,
      last_name,
      email,
      password,
      type_doc,
      num_doc,
      company_id: company_id,
      user_roles: [ 1 ],
      user_permissions: []
    })
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit
  }
}
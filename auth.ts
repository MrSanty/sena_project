import Credentials from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import prisma from "./lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login'
  },
  providers: [
    
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      // @ts-ignore
      async authorize(credentials) {
          const user = await prisma.users.findUnique({
            where: {
              email: credentials!.email as string,
            },
          })
  
          if ( !user ) return null
  
          console.log(user.id)
  
          if ( !bcrypt.compareSync(credentials!.password as string, user.password) ) return null
  
          const { password: _, ...rest } = user
  
          return rest
      }
    })
  ],
})
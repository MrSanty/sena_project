import Credentials from "next-auth/providers/credentials"
import prisma from "./lib/prisma"
import NextAuth from "next-auth"
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
            select: {
              id: true,
              first_name: true,
              password: true,
              company_id: true,
              user_roles: {
                select: {
                  role: {
                    select: {
                      role_permissions: {
                        select: {
                          permission: {
                            select: {
                              name: true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              user_permissions: {
                select: {
                  permission: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            },
            where: {
              email: credentials!.email as string,
            },
          })
  
          if ( !user ) return null
  
          
  
          if ( !bcrypt.compareSync(credentials!.password as string, user.password) ) return null

          const permissions = [
            ...user.user_permissions.map(userPermission => userPermission.permission.name),
            ...user.user_roles.flatMap(userRole => userRole.role.role_permissions.map(rolePermission => rolePermission.permission.name))
          ]
  
          return {
            userId: user.id,
            name: user.first_name,
            company_id: user.company_id,
            permissions
          }
      }
    })
  ],
  callbacks: {
    // @ts-ignore
    async jwt({token, user}) {
      if (user) {
        token.userId = user.userId as number
        token.name = user.name as string
        token.company_id = user.company_id 
        token.permissions = user.permissions
      }
      return token
    },
    // @ts-ignore
    async session({session, token}) {
      session.user.userId = token.userId
      session.user.name = token.name
      session.user.company_id = token.company_id
      session.user.permissions = token.permissions
      return session
    }
  }
})
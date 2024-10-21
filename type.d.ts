declare module "next-auth" {
  interface User {
    userid: number
    company_id: number
    permissions: string[]
  }

  interface Session {
    user: {
      userId: number
      name: string
      company_id: number
      permissions: string[]
    }
  }
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    userid: number
    name: string
    company_id: number
    permissions: string[]
  }
}
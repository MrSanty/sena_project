declare module "next-auth" {
  interface User {
    company_id: number
    permissions: string[]
  }

  interface Session {
    user: {
      name: string
      company_id: number
      permissions: string[]
    }
  }
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    name: string
    company_id: string
    permissions: string[]
  }
}
import * as jwt from 'jsonwebtoken'
import { Prisma } from './generated/prisma-client'

export interface Context {
  prisma: Prisma
  request: any
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string }
    return userId
  }

  throw new AuthError()
}

export const createToken = (userId: String) => jwt.sign({ userId, expiresIn: '7d' }, process.env.APP_SECRET);


export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

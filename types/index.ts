import type { ObjectId } from 'mongoose'
import type { JWTPayload } from 'jose'

export interface AuthPayload extends JWTPayload {
  email?: string
}

export interface User {
  _id: ObjectId
  email: string
  password: string
}

export interface Post {
  _id: ObjectId
  user: User
  name: string
  slug: string
  description?: string
  color?: string
  body: string
  hit: number
  createdAt: string
  updatedAt: string
}

export type SortingFunction<T> = (a: T, b: T) => number

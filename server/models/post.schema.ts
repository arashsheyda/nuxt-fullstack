import { defineMongooseModel } from '#nuxt/mongoose'
import { Types } from 'mongoose'
import type { Post } from '~/types'

export const PostSchema = defineMongooseModel<Post>({
  name: 'Post',
  schema: {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
      unique: true,
    },
    description: {
      type: 'string',
    },
    color: {
      type: 'string',
      default: 'green',
    },
    body: {
      type: 'string',
    },
    hit: {
      type: 'Number',
      default: 0,
    },
  },
  options: {
    timestamps: true,
  },
})

import { defineNuxtModule, logger } from '@nuxt/kit'
import { sha256 } from 'ohash'
import { defu } from 'defu'

type Routes = ['login', 'register', 'logout', 'me']

export interface ModuleOptions {
  secret: string
  exclude?: Array<Routes[number]>
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-mongo-auth',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: false,
    },
    configKey: 'mongoAuth',
  },
  defaults: {
    secret: process.env.MONGO_SECRET as string,
    exclude: []
  },
  async setup(options, nuxt) {

    const config = nuxt.options.runtimeConfig

    const secret = options.secret || sha256(`${Date.now()}${Math.random()}`).slice(0, 32)
    if (!options.secret) {
      // TODO: add logger message
    }


    config.auth = defu(config.auth || {}, {
      mongo: {
        secret,
        exclude: options.exclude,
      }
    })

    logger.info('Mongo Auth is injected!')
  }
})
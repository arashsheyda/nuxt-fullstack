export default defineEventHandler((event) => {
  const { mongo } = useRuntimeConfig(event).auth

  const { url } = event.node.req

  mongo.exclude.forEach((item) => {
    if (`/api/auth/${item}` === url) {
      throw createError({
        statusCode: 404,
        statusMessage: `Page not found: ${url}`
      })
    }
  })
})
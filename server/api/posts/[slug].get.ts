export default defineEventHandler(async (event) => {
  try {
    const post = await PostSchema.findOne({ slug: event.context.params?.slug }).populate({
      path: 'user',
      select: 'email',
    })
    if (!post) {
      throw createError({
        statusCode: 400,
        statusMessage: 'not found!',
      })
    }
    return post
  }
  catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'not found!',
    })
  }
})

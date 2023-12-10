export default defineEventHandler(async (event) => {
  
  const { email } = await requireAuth(event)

  try {
    const user = await UserSchema.findOne({ email })
    if (!user)
      return

    return await PostSchema
      .where({ user: user._id })
      .find()
      .populate({
        path: 'user',
        select: 'email',
      })
  }
  catch (error) {
    throw createError({
      statusCode: 500,
    })
  }
})

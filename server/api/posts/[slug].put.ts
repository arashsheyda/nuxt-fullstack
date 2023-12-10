export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = await requireAuth(event)
  const user = await UserSchema.findOne({ email })
  if (user) {
    try {
      return await PostSchema.findOneAndUpdate({ user: user._id, slug: event.context.params?.slug }, body, { new: true })
    }
    catch (error) {
      return error
    }
  }
})

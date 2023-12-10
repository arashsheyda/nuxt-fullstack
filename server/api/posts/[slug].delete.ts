export default defineEventHandler(async (event) => {
  const { email } = await requireAuth(event)
  const user = await UserSchema.findOne({ email })
  if (user) {
    try {
      return await PostSchema.findOneAndDelete({ user: user._id, slug: event.context.params?.slug })
    }
    catch (error) {
      return error
    }
  }
})

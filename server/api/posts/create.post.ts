export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { email } = await requireAuth(event)

  const user = await UserSchema.findOne({ email })
  if (user) {
    return await new PostSchema({
      user: user._id,
      ...body,
    }).save()
  }
})

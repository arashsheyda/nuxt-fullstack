export default defineEventHandler(async (event) => {
  // test temporarily to register UserSchema for error => Schema hasn't been registered for model "User". Use mongoose.model(name, schema)
  await UserSchema.findOne()
  try {
    return await PostSchema.find({}).populate({
      path: 'user',
      select: 'email',
    })
  }
  catch (error) {
    return error
  }
})

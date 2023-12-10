export default defineEventHandler(async () => {
  return await UserSchema.find().select('-password')
})

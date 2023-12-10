export default defineEventHandler(async (event) => {
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

export default defineEventHandler(async (event) => {
  try {
    return await PostSchema.findOneAndDelete({ slug: event.context.params?.slug })
  }
  catch (error) {
    return error
  }
})

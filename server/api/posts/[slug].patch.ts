export default defineEventHandler(async (event) => {
  try {
    return await PostSchema.findOneAndUpdate(
      { slug: event.context.params?.slug },
      { $inc: { hit: 1 } },
      { new: true },
    )
  }
  catch (error) {
    return error
  }
})

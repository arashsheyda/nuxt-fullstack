export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    return await PostSchema.findOneAndUpdate({ slug: event.context.params?.slug }, body, { new: true })
  }
  catch (error) {
    return error
  }
})

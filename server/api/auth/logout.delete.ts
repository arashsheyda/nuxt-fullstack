export default defineEventHandler(async (event) => {
  return await clearAuth(event)
})

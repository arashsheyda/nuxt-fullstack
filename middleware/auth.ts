export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useAuth()

  watch(loggedIn, () => {
    if (!loggedIn.value)
      return navigateTo('/')
  })

  if (!loggedIn.value)
    return navigateTo('/')
})
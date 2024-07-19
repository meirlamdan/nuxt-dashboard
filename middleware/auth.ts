export default defineNuxtRouteMiddleware(async (to) => {
  const { user } = useAuth()

  if (!user.value) {
    return navigateTo('/login')
  }
})
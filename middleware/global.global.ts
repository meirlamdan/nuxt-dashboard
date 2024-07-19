export default defineNuxtRouteMiddleware(async (to) => {
  const { getUserBySession, user, isAdmin } = useAuth()

  await getUserBySession()
  if (to.path.startsWith('/dashboard')) {
    
    if (!user.value?.id) {
      return navigateTo('/login')
    }
    if (!isAdmin) {
      return navigateTo('/')
    }
    to.meta.layout = 'dashboard'
  }
})


import type { User } from "~/types"

export const useAuth = () => {
  const user = useState<User | null>('user')
  const isAdmin = useState<boolean>('isAdmin', () => false)

  const getUserBySession = async () => {
    if (user.value || !useCookie('h3').value) return
    const { data } = await useFetch('/api/user/auth')
    user.value = data.value || null
    isAdmin.value = user.value?.role === 'admin'
  }

  const logOut = async () => {
    await useFetch('/api/user/logout')
    user.value = null
  }

  return {
    getUserBySession,
    user,
    logOut,
    isAdmin,
  }
}

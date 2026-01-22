import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { isEmpty, find } from 'lodash'
import { getCurrentUser, getAllUsers } from '../utils/helper'
import { setItem, removeItem } from '../utils/localStorage'
import { CURRENT_USER, USERS, ROUTES_MAP, AUTH_CHANGED_EVENT_NAME } from '../utils/constant'

const currentUser = ref(null)
const isLoggedIn = computed(() => !isEmpty(currentUser.value))

export const useAuth = () => {
  const router = useRouter()
  
  const loadCurrentUser = () => {
    currentUser.value = getCurrentUser()
  }

  const login = (email, password) => {
    const users = getAllUsers()
    const user = find(users, {email, password})
    if (user) {
      setItem(CURRENT_USER, user)
      currentUser.value = user
      window.dispatchEvent(new Event(AUTH_CHANGED_EVENT_NAME))
      return { error: null }
    }
    return { error: 'Invalid credentials' }
  }

  const register = (name, email, password, avatar = '') => {
    const users = getAllUsers()
    const existingUser = find(users, {email})
    if (existingUser) {
      return { error: 'Email already registered' }
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      avatar,
      createdAt: Date.now(),
    }
    users.push(newUser)
    setItem(USERS, users)
    return { error: null }
  }

  const logout = () => {
    removeItem(CURRENT_USER)
    currentUser.value = null
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT_NAME))
    router.push({ name: ROUTES_MAP.HOME.name })
  }

  const updateProfile = (updates) => {
    const users = getAllUsers()
    const userIndex = users.findIndex((u) => u.id === currentUser.value.id)
    if (userIndex === -1) {
      return { error: 'User not found' }
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updates
    }
    setItem(USERS, users)
    setItem(CURRENT_USER, users[userIndex])
    currentUser.value = users[userIndex]
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT_NAME))

    return { error: null }
  }

  return {
    currentUser,
    isLoggedIn,
    loadCurrentUser,
    login,
    register,
    logout,
    updateProfile
  }
}

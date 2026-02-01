import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { isEmpty } from 'lodash'
import { supabase } from '../libs/supabaseClient'
import { hashPassword, comparePassword } from '../utils/password'
import { ROUTES_MAP, DATABASE_CONFIG } from '../utils/constant'
import { generateToken, verifyToken, removeToken } from '../utils/jwt'
import { Result } from '../dtos/Result'

const currentUser = ref(null)
const isLoggedIn = computed(() => !isEmpty(currentUser.value))

export const useAuth = () => {
  const router = useRouter()

  const loadCurrentUser = async () => {
    try {
      const {payload} = await verifyToken()
      currentUser.value = toDto(payload.user)
    } catch (error) {
      currentUser.value = null
      removeToken()
      return Result.fail(error.message)
    }
  }

  const login = async (email, password) => {
    const { data: user, error } = await supabase
      .from(DATABASE_CONFIG.PROFILES.table)
      .select(DATABASE_CONFIG.ALL)
      .eq(DATABASE_CONFIG.PROFILES.fields.EMAIL, email)
      .single()

    if (error) {
      return Result.fail(error.message)
    }

    if (isEmpty(user)) {
      return Result.fail('Invalid credentials')
    }

    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) {
      return Result.fail('Invalid credentials')
    }

    const userWithoutPassword = { ...user, password: undefined }
    await generateToken({ user: userWithoutPassword })
    currentUser.value = userWithoutPassword
  }

  const register = async (name, email, password, avatar) => {
    const { data: existingUsers } = await supabase
      .from(DATABASE_CONFIG.PROFILES.table)
      .select(DATABASE_CONFIG.PROFILES.fields.ID)
      .eq(DATABASE_CONFIG.PROFILES.fields.EMAIL, email)
    if (existingUsers.length) {
      return Result.fail('Email already registered')
    }

    const hashedPassword = await hashPassword(password)

    const { error } = await supabase
      .from(DATABASE_CONFIG.PROFILES.table)
      .insert({
        name,
        email,
        password: hashedPassword,
        avatar: avatar ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
      })
      .select()
      .single()

      if(error) {
        return Result.fail(error.message)
      }
  }

  const logout = () => {
    removeToken()
    currentUser.value = null
    router.push({ name: ROUTES_MAP.HOME.name })
  }

  const updateProfile = async (updates) => {
    const updateData = { ...updates }

    if (updates.password) {
      updateData.password = await hashPassword(updates.password)
    }

    const { data, error } = await supabase
      .from(DATABASE_CONFIG.PROFILES.table)
      .update(updateData)
      .eq(DATABASE_CONFIG.PROFILES.fields.ID, currentUser.value.id)
      .select()
      .single()

    if (error) {
      return Result.fail(error.message)
    }

    const userWithoutPassword = { ...data, password: undefined }
    await generateToken({ user: userWithoutPassword })
    currentUser.value = {
      ...currentUser.value,
      ...userWithoutPassword
    }
  }

  const getAuthorById = async (authorId) => {
    const { data, error } = await supabase
      .from(DATABASE_CONFIG.PROFILES.table)
      .select(DATABASE_CONFIG.ALL)
      .eq(DATABASE_CONFIG.PROFILES.fields.ID, parseInt(authorId))
      .single()

    return error ? Result.fail(error.message) : Result.ok(toDto(data))
  }

  const toDto = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: new Date(user.created_at).getTime(),
    updatedAt: user.updated_at ? new Date(user.updated_at).getTime() : null
  })

  return {
    currentUser,
    isLoggedIn,
    loadCurrentUser,
    login,
    register,
    logout,
    updateProfile,
    getAuthorById
  }
}

import { SignJWT, jwtVerify } from 'jose'
import config from "../config";

const SECRET_KEY = new TextEncoder().encode(config.jwtSecret)
const TOKEN_KEY = 'auth_token'

export const generateToken = async (payload) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(config.jwtExpiration)
    .sign(SECRET_KEY)

  setToken(token)
}

export const verifyToken = async () => {
  const token = getToken()
  if (!token) {
    throw new InvalidCredentialsError('No token provided')
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    const isExpired = payload.exp < Date.now() / 1000
    return isExpired ? { valid: false } : { valid: true, payload }
  } catch (error) {
    removeToken()
    throw new InvalidCredentialsError(error.message)
  }
}

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

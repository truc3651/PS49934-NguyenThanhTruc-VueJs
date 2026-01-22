export const getItem = (key, fallbackValue) => JSON.parse(localStorage.getItem(key) || fallbackValue)

export const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const removeItem = (key) => localStorage.removeItem(key)
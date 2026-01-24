export const getItem = (key, fallbackValue) => {
    const value = localStorage.getItem(key)
    if (!value && !fallbackValue) return null
    return JSON.parse(value || fallbackValue)
}

export const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const removeItem = (key) => localStorage.removeItem(key)
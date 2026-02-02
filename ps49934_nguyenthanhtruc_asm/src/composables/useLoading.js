import { ref } from 'vue'

export const useLoading = (initialState = false) => {
  const isLoading = ref(initialState)

  const withLoading = async (asyncFn) => {
    isLoading.value = true
    try {
      return asyncFn()
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    withLoading
  }
}

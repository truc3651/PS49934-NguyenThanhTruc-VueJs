import { ref, computed } from 'vue'
import { range } from 'lodash'

export const usePagination = (itemsPerPage = 10) => {
  const currentPage = ref(1)
  const totalCount = ref(0)

  const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage))
  const pageNumbers = computed(() => range(1, totalPages.value + 1))

  const goToPage = (page, callback) => {
    if (currentPage.value === page) return
    currentPage.value = page
    if (callback) callback(page)
  }

  const goToNextPage = (callback) => {
    if (currentPage.value < totalPages.value) {
      goToPage(currentPage.value + 1, callback)
    }
  }

  const goToPreviousPage = (callback) => {
    if (currentPage.value > 1) {
      goToPage(currentPage.value - 1, callback)
    }
  }

  const resetPagination = () => {
    currentPage.value = 1
  }

  const setTotalCount = (count) => {
    totalCount.value = count
  }

  return {
    currentPage,
    totalCount,
    totalPages,
    pageNumbers,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    resetPagination,
    setTotalCount
  }
}
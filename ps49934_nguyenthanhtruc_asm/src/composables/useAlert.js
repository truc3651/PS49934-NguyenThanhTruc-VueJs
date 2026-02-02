import { ref } from 'vue'

const alerts = ref([])
let alertId = 0

export const useAlert = () => {
  const showAlert = (message, type) => {
    const id = ++alertId
    alerts.value.push({ id, message, type })
    setTimeout(() => removeAlert(id), 5000)
  }

  const showError = (message) => showAlert(message, 'danger')
  const showSuccess = (message) => showAlert(message, 'success')
  const showWarning = (message) => showAlert(message, 'warning')
  const showInfo = (message) => showAlert(message, 'info')

  const removeAlert = (id) => {
    const index = alerts.value.findIndex(a => a.id === id)
    if (index > -1) {
      alerts.value.splice(index, 1)
    }
  }

  const clearAlerts = () => {
    alerts.value = []
  }

  return {
    alerts,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    removeAlert,
    clearAlerts
  }
}

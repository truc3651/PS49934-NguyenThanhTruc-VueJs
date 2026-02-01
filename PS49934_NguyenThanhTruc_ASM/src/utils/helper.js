export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString()

export const truncateContent = (content, maxLength = 150) => {
  if (!content) return ''
  if (content.length <= maxLength) return content
  return content.substring(0, maxLength) + '...'
}

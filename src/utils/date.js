/**
 * Format a date string to "Mon YYYY" format (e.g., "Aug 2015")
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    console.error(`Invalid date string: ${dateString}`)
    return ''
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
}

/**
 * Format a date range with optional "Present" for current/ongoing items
 * @param {string} startDate - ISO date string for start
 * @param {string|null} endDate - ISO date string for end, or null if ongoing
 * @param {boolean} isOngoing - Whether the item is current/ongoing
 * @returns {string} Formatted date range (e.g., "Aug 2015 - Present")
 */
export const formatDateRange = (startDate, endDate, isOngoing = false) => {
  if (!startDate) {
    console.error('formatDateRange: startDate is required')
    return ''
  }
  const start = formatDate(startDate)
  if (!start) return ''
  const end = isOngoing ? 'Present' : formatDate(endDate)
  return `${start} - ${end}`
}

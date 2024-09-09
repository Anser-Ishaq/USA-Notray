/**
 * Function to format an ISO 8601 date string to "dd month year, hr:min AM/PM"
 * @param {string} isoDate - The ISO 8601 date string
 * @returns {string} - The formatted date string
 */
export const formatISODate = (isoDate) => {
    const date = new Date(isoDate)

    // Extract date components
    const day = date.getDate().toString().padStart(2, '0') // Day (dd)
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const month = monthNames[date.getMonth()] // Month name
    const year = date.getFullYear() // Year

    // Extract and format time components
    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0') // Minutes
    const period = hours >= 12 ? 'PM' : 'AM' // AM/PM

    // Convert to 12-hour time format
    hours = hours % 12 || 12 // Convert 0 to 12 for 12-hour clock

    // Construct formatted date string
    return `${day} ${month} ${year}, ${hours}:${minutes} ${period}`
}

 

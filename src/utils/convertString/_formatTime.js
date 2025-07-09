export function formatTime(vnpTime) {
  if(vnpTime && typeof vnpTime === 'string') {
    const year = vnpTime.substring(0, 4)
    const month = vnpTime.substring(4, 6)
    const day = vnpTime.substring(6, 8)
    const hour = vnpTime.substring(8, 10)
    const minute = vnpTime.substring(10, 12)
    const second = vnpTime.substring(12, 14)
  
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`
  }
    
  }

  export function formatDate(isoString, hasTime = false) {
    if(isoString) {
      const date = new Date(isoString)
  
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
    
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      if(hasTime) {
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
      } 
        return `${day}/${month}/${year}`
    }
    
  }
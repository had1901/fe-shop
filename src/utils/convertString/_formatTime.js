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
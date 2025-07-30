export function generateOrderCode() {
    const now = new Date()
    const yyyy = now.getFullYear().toString().slice(2)
    const MM = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    // const HH = String(now.getHours()).padStart(2, '0')
    // const mm = String(now.getMinutes()).padStart(2, '0')
  
    const random = Math.floor(1000 + Math.random() * 9000) // 4 số ngẫu nhiên
  
    return `${yyyy}${MM}${dd}${random}`
  }


export const generateClass = (status) => {
    switch(status) {
      case 'pending':
        return 'pending'
      case 'completed':
        return 'completed'
      case 'shipping':
        return 'shipping'
      case 'destroy':
        return 'destroy'
      default:
        return ''
    }
  }

  
export const generateStatusText = (status) => {
  switch(status) {
    case 'pending':
      return 'Chờ xác nhận'
    case 'completed':
      return 'Hoàn thành'
    case 'shipping':
      return 'Đang giao hàng'
    case 'destroy':
      return 'Đã hủy'
    default:
      return ''
  }
}
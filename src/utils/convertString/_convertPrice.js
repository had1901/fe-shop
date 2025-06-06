

export const convertPrice = (price) => {
    if(typeof price === 'number') {
      return price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
      })
    }
  }
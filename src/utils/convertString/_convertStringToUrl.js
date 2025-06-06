export const convertStringToUrl = (str) => {
    if(typeof str === 'string') {
      return str
              .normalize("NFD")
              .toLowerCase()
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/đ/g, "d")
              .replace(/Đ/g, "D")
              .replace(/-/g, "")
              .replace(/\s+/g, '-') 
              .trim()
      
    }
  }
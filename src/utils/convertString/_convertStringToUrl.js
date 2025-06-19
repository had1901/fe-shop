export const convertStringToUrl = (str) => {
  if (typeof str === 'string') {
    const normalized = str
      .normalize("NFD")                        // Tách dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, "")        // Xóa dấu
      .replace(/đ/g, "d")                     // Chuyển đ -> d
      .replace(/Đ/g, "D")
      .replace(/[^a-zA-Z0-9\s-]/g, '')        // Xóa ký tự đặc biệt (giữ lại chữ, số, khoảng trắng và dấu -)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')                   // Thay khoảng trắng bằng dấu gạch ngang

    return encodeURIComponent(normalized)     // Mã hóa an toàn cho URL
  }
  return ''
}
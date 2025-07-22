export const removeHash = (str) => {
        return str
          .normalize('NFD')                      // Tách dấu ra khỏi ký tự
          .replace(/[\u0300-\u036f]/g, '')       // Xóa dấu
          .replace(/đ/g, 'd')                    // thay đ -> d
          .replace(/Đ/g, 'D')
          .replace(/\s+/g, '')
          .toLowerCase()
          .trim()                        // Viết thường
    }
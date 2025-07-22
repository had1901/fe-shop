export const renderRules = (min, max, type, pattern) => {
        return [
            { required: true, message: 'Vui lòng nhập trường này!' },
            { min: min, message: `Vui lòng nhập tổi thiểu ${min} ký tự` },
            { max: max, message: `Vui lòng nhập tối đa ${max} ký tự` },
            { type: type, message: `Định dạng ${type} không hợp lệ!` },
            { pattern: pattern, message: 'Chỉ cho phép chữ, số, dấu gạch dưới' },
        ]
    }
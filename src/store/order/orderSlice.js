import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    infoPayment: {
        vnp_Amount: "",
        vnp_BankCode: "",
        vnp_CardType: "",
        vnp_OrderInfo: "",
        vnp_PayDate: "",
        vnp_ResponseCode: "",
        vnp_SecureHash: "",
        vnp_TmnCode: "",
        vnp_TransactionNo: "",
        vnp_TransactionStatus: "",
        vnp_TxnRef: "",
        statusText: '',
    },
    orders: []
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setInfoPayment: (state, action) => {
            const statusMap = {
                '00': 'Giao dịch thành công',
                '09': 'Tài khoản/thẻ của khách hàng chưa đăng ký dịch vụ InternetBanking',
                '10': 'Xác thực thông tin quá số lần quy định',
                '11': 'Thanh toán chờ quá hạn, vui lòng thử lại',
                '12': 'Tài khoản bị khóa',
                '13': 'Nhập sai mật khẩu xác thực OTP',
                '24': 'Giao dịch bị hủy',
                '51': 'Tài khoản không đủ số dư',
                '65': 'Tài khoản vượt quá hạn mức giao dịch trong ngày',
                '75': 'Ngân hàng đang bảo trì',
                '79': 'Nhập sai mật khẩu thanh toán quá số lần quy định',
                '99': 'Lỗi thanh toán, vui lòng thử lại',
            }
            const statusText = statusMap[action.payload.vnp_ResponseCode] || 'Giao dịch thất bại'
            
                state.infoPayment = {
                    ...state.infoPayment,
                    ...action.payload,
                    statusText
                  }
        },
        setOrders: (state, action) => {
            state.orders = action.payload
        }

    }
})

export const { 
    setInfoPayment,
    setOrders
} = orderSlice.actions
export default orderSlice.reducer
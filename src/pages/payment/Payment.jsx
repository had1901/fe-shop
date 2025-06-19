import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { formatTime } from './../../utils/convertString/_formatTime';

function Payment() {
  const { search } = useLocation()
  const [bill, setBill] = useState({})
  const [responseCode, setResponseCode] = useState(null)
  console.log(bill)
  console.log(responseCode)


  useEffect(() => {
    let result = {}
    const params = new URLSearchParams(search)
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    setResponseCode(params.get('vnp_ResponseCode'))
    setBill(result)
  },[search])

  return (
    <div>
      <h1>Thanh toán {bill.vnp_ResponseCode && bill.vnp_TransactionStatus === '00' ? 'thành công' : 'không thành công'}</h1>
      <div>Ngân hàng: {bill.vnp_BankCode}</div>
      <div>Loại thẻ: {bill.vnp_CardType}</div>
      <div>Nội dung: {bill.vnp_OrderInfo}</div>
      <div>Tổng tiền: {bill.vnp_Amount / 100}</div>
      <div>Thời gian giao dịch: {formatTime(bill.vnp_PayDate)}</div>
    </div>
  )
}

export default Payment
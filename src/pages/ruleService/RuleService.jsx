import React from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './RuleService.module.scss'

function RuleService() {
  const cs = useStyles(styles)

  return (
    <div className='container'>
      <div className={cs('rile-service')}>
          <h1 className={cs('heading')}>Điều khoản dịch vụ</h1>
    
          <div>
            <h2 className={cs('title')}>1. Giới thiệu</h2>
            <p className={cs('mb-2')}>
              Chào mừng quý khách hàng đến với website chúng tôi.
            </p>
            <p className={cs('mb-2')}>
              Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý khách đồng ý với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web, sau khi các thay đổi về Điều khoản này được đăng tải, có nghĩa là quý khách chấp nhận với những thay đổi đó.
            </p>
            <p className={cs('mb-2')}>
              Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.
            </p>
          </div>
    
          <div>
            <h2 className={cs('title')}>2. Hướng dẫn sử dụng website</h2>
            <p className={cs('mb-2')}>
              Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng hóa theo quy định hiện hành của pháp luật Việt Nam.
            </p>
            <p className={cs('mb-2')}>
              Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website. Nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào đường link ở dưới cùng trong mọi email quảng cáo.
            </p>
          </div>
    
          <div>
            <h2 className={cs('title')}>3. Thanh toán an toàn và tiện lợi</h2>
            <p className={cs('mb-2')}>
              Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức phù hợp:
            </p>
            <ul className={cs('list-disc pl-6 space-y-1')}>
              <li className={cs('')}>Cách 1: Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ người bán)</li>
              <li className={cs('')}>Cách 2: Thanh toán sau (COD – giao hàng và thu tiền tận nơi)</li>
              <li className={cs('')}>Cách 3: Thanh toán online qua thẻ tín dụng, chuyển khoản</li>
            </ul>
          </div>
      </div>
    </div>
  )
}

export default RuleService
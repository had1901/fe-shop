import React from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './PrivatePolicy.module.scss'

function PrivatePolicy() {
  const cs = useStyles(styles)

  return (
    <section className='container'>
        <div className={cs('policy-container')}>
            <h2 className={cs('section-title')}>1. Mục đích và phạm vi thu thập thông tin</h2>
            <p className={cs('paragraph')}>
                Chúng tôi không bán, chia sẻ hay trao đổi thông tin cá nhân của khách hàng thu thập trên trang web cho một bên thứ ba nào khác.
            </p>
            <p className={cs('paragraph')}>
                Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong nội bộ công ty. Khi bạn liên hệ đăng ký dịch vụ, thông tin cá nhân mà Chúng tôi thu thập bao gồm:
            </p>
            <ul className={cs('list')}>
                <li>Họ và tên</li>
                <li>Địa chỉ</li>
                <li>Điện thoại</li>
                <li>Email</li>
            </ul>
            <p className={cs('paragraph')}>Ngoài thông tin cá nhân là các thông tin về dịch vụ:</p>
            <ul className={cs('list')}>
                <li>Tên sản phẩm</li>
                <li>Số lượng</li>
                <li>Thời gian giao nhận sản phẩm</li>
            </ul>
    
            <h2 className={cs('section-title')}>2. Phạm vi sử dụng thông tin</h2>
            <p className={cs('paragraph')}>
                Khi người dùng đăng nhập qua tài khoản Google, chúng tôi thu thập các thông tin cơ bản bao gồm: tên, địa chỉ email và ảnh đại diện (nếu có), để phục vụ mục đích xác thực, hiển thị thông tin người dùng, và cung cấp các dịch vụ cá nhân hóa.
                Thông tin cá nhân thu thập được sẽ chỉ được Chúng tôi sử dụng trong nội bộ công ty và cho một hoặc tất cả các mục đích sau đây:
            </p>
            <ul className={cs('list')}>
                <li>Hỗ trợ khách hàng</li>
                <li>Cung cấp thông tin liên quan đến dịch vụ</li>
                <li>Xử lý đơn đặt hàng và cung cấp dịch vụ và thông tin qua trang web của chúng tôi theo yêu cầu của bạn</li>
            </ul>
            <p className={cs('paragraph')}>
                Chúng tôi có thể sẽ gửi thông tin sản phẩm, dịch vụ mới, thông tin về các sự kiện sắp tới hoặc thông tin tuyển dụng nếu quý khách đăng kí nhận email thông báo.
            </p>
            <p className={cs('paragraph')}>
                Trong trường hợp có yêu cầu của pháp luật, Chúng tôi có trách nhiệm hợp tác cung cấp thông tin cá nhân khách hàng khi có yêu cầu từ cơ quan tư pháp bao gồm:
                Viện kiểm soát, tòa án, cơ quan công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của khách hàng.
                Ngoài ra không ai có quyền xâm phạm vào thông tin cá nhân của khách hàng.
            </p>
    
            <h2 className={cs('section-title')}>3. Thời gian lưu trữ thông tin</h2>
            <p className={cs('paragraph')}>
                Đối với thông tin cá nhân, Chúng tôi chỉ xóa đi dữ liệu này nếu khách hàng có yêu cầu, khách hàng yêu cầu gửi mail về <a href="mailto:senna2k20@gmail.com">senna2k20@gmail.com</a>.
            </p>
    
            <h2 className={cs('section-title')}>4. Những người hoặc tổ chức có thể được tiếp cận với thông tin cá nhân</h2>
            <p className={cs('paragraph')}>Đối tượng được tiếp cận với thông tin cá nhân của khách hàng thuộc một trong những trường hợp sau:</p>
            <ul className={cs('list')}>
                <li>Hoàng Anh Đức (chủ sở hữu website)</li>
                <li>
               
                Các đối tác này sẽ nhận được những thông tin theo thỏa thuận hợp đồng (có thể một phần hoặc toàn bộ thông tin tùy theo điều khoản hợp đồng) để tiến hành hỗ trợ người dùng sử dụng dịch vụ do chúng tôi cung cấp.
                </li>
            </ul>
    
            <h2 className={cs('section-title')}>5. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</h2>
            <ul className={cs('list')}>
                <li>Hoàng Anh Đức (chủ sở hữu website)</li>
                <li>Địa chỉ: Yên Thường - Đông Anh - Hà Nội</li>
                <li>Điện thoại: 0961566754</li>
                <li>Website: <a href="https://gearvn-rust.vercel.app/">https://gearvn-rust.vercel.app/</a></li>
                <li>Email: <a href="mailto:senna2k20@gmail.com">senna2k20@gmail.com</a></li>
            </ul>
    
            <h2 className={cs('section-title')}>6. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình</h2>
            <p className={cs('paragraph')}>
                Chúng tôi không thu thập thông tin khách hàng qua trang web, thông tin cá nhân khách hàng được thực hiện thu thập qua email liên hệ đặt mua sản phẩm, dịch vụ gửi về hộp mail của chúng tôi:
                <a href="mailto:senna2k20@gmail.com">senna2k20@gmail.com</a> hoặc số điện thoại liên hệ đặt mua sản phẩm gọi về 0961566754.
            </p>
            <p className={cs('paragraph')}>
                Bạn có thể liên hệ địa chỉ email cùng số điện thoại trên để yêu cầu Chúng tôi chỉnh sửa dữ liệu cá nhân của mình.
            </p>
    
            <h2 className={cs('section-title')}>7. Cơ chế tiếp nhận và giải quyết khiếu nại</h2>
            <p className={cs('paragraph')}>
                Chúng tôi biết việc bảo vệ thông tin cá nhân của bạn là rất quan trọng, bạn được đảm bảo rằng thông tin cung cấp cho chúng tôi sẽ được bảo mật, 
                Chúng tôi cam kết không chia sẻ, bán hoặc cho thuê thông tin cá nhân của bạn cho bất kỳ người nào khác.
            </p>
            <p className={cs('paragraph')}>
                Chúng tôi cam kết chỉ sử dụng các thông tin của bạn vào các trường hợp sau:
            </p>
            <ul className={cs('list')}>
                <li>Nâng cao chất lượng dịch vụ dành cho khách hàng</li>
                <li>Giải quyết các tranh chấp, khiếu nại</li>
                <li>Khi cơ quan pháp luật có yêu cầu</li>
            </ul>
            <p className={cs('paragraph')}>
                Chúng tôi hiểu rằng quyền lợi của bạn trong việc bảo vệ thông tin cá nhân cũng chính là trách nhiệm của chúng tôi nên trong bất kỳ trường hợp có thắc mắc, góp ý nào liên quan đến chính sách bảo mật,
                vui lòng liên hệ qua số 0961566754 hoặc email: <a href="mailto:senna2k20@gmail.com">senna2k20@gmail.com</a>.
            </p>
        </div>
    </section>
  )
}

export default PrivatePolicy
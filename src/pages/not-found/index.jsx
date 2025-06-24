import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button, Flex } from 'antd';
import { useNavigate } from 'react-router';

function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div style={{ margin: '80px auto' }}>
      <DotLottieReact
        src='../../../public/not-found-animate.lottie'
        loop
        autoplay
        style={{ width: '40%', margin: '0 auto'}}
      />
       <Flex vertical gap="small" style={{ width: '30%', margin: '30px auto 0' }}>
          <Button type="primary" block size='large' onClick={() => navigate('/')}>
            Về trang chủ
          </Button>
         
        </Flex>
    </div>

  )
}

export default NotFoundPage
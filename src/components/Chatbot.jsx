import React, { useEffect } from 'react'

function Chatbot() {

     useEffect(() => {
            // Khởi tạo Crisp
        window.$crisp = []
        window.CRISP_WEBSITE_ID = "2bf44a4e-c08f-4a2d-884a-bba9cffff4d9"

        // Thêm script
        const script = document.createElement("script")
        script.src = "https://client.crisp.chat/l.js"
        script.async = true
        document.head.appendChild(script)

        // ép vị trí liên tục mỗi 0.5s
    const interval = setInterval(() => {
      const bubble = document.querySelector(".crisp-client .cc-nc")
      if (bubble) {
        bubble.style.bottom = "120px"
        bubble.style.right = "20px"
        bubble.style.zIndex = "9999"
      }
    }, 500)

    return () => clearInterval(interval)
    },[])

  return (
    <div></div>
  )
}

export default Chatbot
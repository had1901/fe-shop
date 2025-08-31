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
        
        script.onload = () => {
            // check last visit
            const lastVisit = localStorage.getItem("lastVisit")
            const now = Date.now()

            // nếu user quay lại sau > 1 ngày (24h)
            if (lastVisit && now - parseInt(lastVisit) > 24 * 60 * 60 * 1000) {
                window.$crisp.push(["do", "session:reset"])
            }

            // cập nhật lại timestamp
            localStorage.setItem("lastVisit", now.toString())
        }

    },[])

  return (
    <div></div>
  )
}

export default Chatbot
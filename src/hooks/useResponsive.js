import { useEffect, useState } from "react"


export const useResponsive = () => {
    const [numDisplay, setNumDisplay] = useState(4)

    useEffect(() => {
        const sizeDisplay = () => {
            if(window.innerWidth >= 1200) {
                setNumDisplay(5)
            } else if(window.innerWidth >= 992) {
                setNumDisplay(4) 
            } else if(window.innerWidth >= 768) {
                setNumDisplay(3)
            } else if(window.innerWidth <= 767) {
                setNumDisplay(2)
            } else {
                setNumDisplay(2)
            }
           
        }
        sizeDisplay()
        window.addEventListener('resize', sizeDisplay);
        return () => window.removeEventListener('resize', sizeDisplay)
    },[])
    return numDisplay
}
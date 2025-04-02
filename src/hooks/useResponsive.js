import { useEffect, useState } from "react"


export const useResponsive = () => {
    const [numDisplay, setNumDisplay] = useState(4)

    useEffect(() => {
        const sizeDisplay = () => {
            if(window.innerWidth >= 1200) {
                setNumDisplay(4)
            } else if(window.innerWidth >= 998) {
                setNumDisplay(3)
            } else if(window.innerWidth >= 768) {
                setNumDisplay(2)
            } else {
                setNumDisplay(1)
            }
           
        }
        sizeDisplay()
        window.addEventListener('resize', sizeDisplay);
        return () => window.removeEventListener('resize', sizeDisplay)
    },[])
    return numDisplay
}
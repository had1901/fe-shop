import { useCallback, useEffect, useRef, useState } from "react";


export function useSlider(length, numDisplayItem = 4) {
    const [index, setIndex] = useState(0)
    const [isClick, setIsClick] = useState(false)
    const [widthTrack, setWidthTrack] = useState(0) // độ rộng của slider
    const [widthItem, setWidthItem] = useState(200) // độ rộng của 1 item
    const [percent, setPercent] = useState(25) // phần trăm độ rộng mỗi item 
    const trackRef = useRef(null) // tham chiếu đến element slider

    // const [startLeft, setStartLeft] = useState(0) // vị trí left slider ban đầu
    // const [startX, setStartX] = useState(0) // vị trí chuột ban đầu
    // const [isNext, setIsNext] = useState(false) // check đang có kéo next hay không

    const prevSlide = () => {
        if(isClick) return
        const track = trackRef.current
        if(track){
            setIndex(prev => prev - 1)
            setIsClick(true)
            trackRef.current.scrollTo({
                left: trackRef.current.scrollLeft - widthItem,
                behavior : 'smooth'
            })
            console.log(trackRef.current.scrollLeft, widthItem)
            setTimeout(() => setIsClick(false), 500)
        }
        
    
    }

    const nextSlide = useCallback(() => {
        if(isClick) return 
        const track = trackRef.current
        if(track){
            setIndex(prev => prev + 1)
            setIsClick(true)
            trackRef.current.scrollTo({
                left: trackRef.current.scrollLeft + widthItem,
                behavior : 'smooth'
            })
            setTimeout(() => setIsClick(false), 500)
        }
    },[isClick, widthItem])
    
    useEffect(() => {
        const track = trackRef.current
        if(!track) return

        // quay về đầu slider nếu vượt quá số lượng
        if(index === length) {
            setIndex(0)
        }

        // chạy xuống cuối slider
        if(index < 0) {
            setIndex(length - 1)
        }
    }, [index, length])

    useEffect(() => {
        // lấy width của sliders
        setWidthTrack(trackRef.current.getBoundingClientRect().width)
        // tính số lượng phần tử hiển thị dựa trên input "numDisplayItem"
        setPercent(100 / numDisplayItem)
    },[numDisplayItem])

    useEffect(() => {
        // tính width của mỗi item
        setWidthItem((widthTrack * percent) / 100)
    },[widthTrack, percent])

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 3000)
        return () => clearInterval(timer)
    },[nextSlide])


    

    return {index, trackRef, prevSlide, nextSlide, percent}
}
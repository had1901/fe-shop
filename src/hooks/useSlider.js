import { useCallback, useEffect, useRef, useState } from "react";


export function useSlider(length, numDisplayItem = 4, isActive) {
    const [index, setIndex] = useState(0)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isClick, setIsClick] = useState(false)
    const [widthTrack, setWidthTrack] = useState(0) // độ rộng của slider
    const [widthItem, setWidthItem] = useState(200) // độ rộng của 1 item
    const [percent, setPercent] = useState(25) // phần trăm độ rộng mỗi item 
    const trackRef = useRef(null) // tham chiếu đến element slider
    const timerRef = useRef(null)
    // const [startLeft, setStartLeft] = useState(0) // vị trí left slider ban đầu
    // const [startX, setStartX] = useState(0) // vị trí chuột ban đầu
    // const [isNext, setIsNext] = useState(false) // check đang có kéo next hay không

    console.log({
        'current': currentSlide,
        'length': length
    })
    const prevSlide = () => {
        if(isClick) return
        const track = trackRef.current
        if(track){
            setCurrentSlide(prev => prev - 1)
            setIndex(prev => prev - 1)
            setIsClick(true)
            trackRef.current.scrollTo({
                left: trackRef.current.scrollLeft - widthItem,
                behavior : 'smooth'
            })
            console.log(trackRef.current.scrollLeft, widthItem)
            setTimeout(() => setIsClick(false), 400)
        }
    }

    const nextSlide = useCallback(() => {
        if(isClick) return 
        const track = trackRef.current
        if(track){
            setCurrentSlide(prev => prev + 1)
            setIndex(prev => prev + 1)
            setIsClick(true)
            trackRef.current.scrollTo({
                left: trackRef.current.scrollLeft + widthItem,
                behavior : 'smooth'
            })
            setTimeout(() => setIsClick(false), 400)
        }
    },[isClick, widthItem])
    
    // useEffect(() => {
    //     const track = trackRef.current
    //     if(!track) return

    //     // quay về đầu slider nếu vượt quá số lượng
    //     if(index === length) {
    //         setIndex(0)
    //     }

    //     // chạy xuống cuối slider
    //     if(index < 0) {
    //         setIndex(length - 1)
    //     }
    // }, [index, length])

    // lấy width của sliders
    // tính số lượng phần tử hiển thị dựa trên input "numDisplayItem"
    useEffect(() => {
        setWidthTrack(trackRef.current.getBoundingClientRect().width)
        setPercent(100 / numDisplayItem)
    },[numDisplayItem])

    // tính width của mỗi item
    useEffect(() => {
        setWidthItem((widthTrack * percent) / 100)
    },[widthTrack, percent])

    // auto loop
    useEffect(() => {
        
        if(isActive){
            if(timerRef.current){
                console.log('Đang click và dừng auto')
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        } else {
            timerRef.current = setInterval(() => {
                setCurrentSlide(prev => {
                    if(prev >= length){
                        console.log('Dừng interval', timerRef.current)
                        clearInterval(timerRef.current)
                        timerRef.current = null
                        return prev
                    }
                    console.log('Đang chạy', timerRef.current)
                    nextSlide()
                    return prev + 1
                })
                console.log('Interval')
            }, 3000)
            
        }

        return () => {
            if(timerRef.current){
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
    },[nextSlide, isActive, length])


    

    return {index, trackRef, prevSlide, nextSlide, percent, setWidthTrack, setCurrentSlide, widthTrack, widthItem}
}
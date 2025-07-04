// helper function
        export async function urlToFile(url, filename, mimeType) {
            const res = await fetch(url)
            const blob = await res.blob()
            return new File([blob], filename, { type: mimeType })
        }

        const aaa = async () => {
            const data = await urlToFile('https://res.cloudinary.com/mp3-img/image/upload/v1751621817/gearvn/product-images/collection/collection0.jpg', 'haha', 'image/*')
            console.log(data)
        }
        aaa()
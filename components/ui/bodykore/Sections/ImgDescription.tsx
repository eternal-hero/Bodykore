import { Richtext } from "services/graphCMS"

interface ImageProps {
    img: string
    title?: string
    description: string
}



interface ImgDescriptionProps {
    images: ImageProps[]
    imgHeight: string
    imgWidth: string
    textSize?: string
}

export default function ImgDescription({ images, imgHeight, imgWidth, textSize }: ImgDescriptionProps) {

    return (
        <>
        <section className="max-w-8xl m-auto">
            <div className="flex flex-wrap justify-center gap-2">
                {images.map((img, i) => {
                        console.log(img)
                return (
                    <div className="w-full lg:w-1/5 px-5 pb-5" key={i}>
                        <div className="flex justify-center">
                            <img className={`w-20 mb-5 object-cover`} src={img.img} alt="" />
                        </div>
                        <h2 className='text-4xl text-red-bc2026 text-center w-auto font-bebas font-bold italic pb-2' style={{ letterSpacing: '1px' }}>{img.title}</h2>
                        {/* <h5 className='text-md text-center w-auto font-roboto' style={{ letterSpacing: '1px' }}>{img.description}</h5> */}
                        {/* {img.description && <h5  className={`${textSize} font-roboto text-black-1c2023 text-center`} dangerouslySetInnerHTML={{__html: img.description}} />} */}
                    </div>
                )
                })}
            </div>  

        </section>
        </>
    )
}
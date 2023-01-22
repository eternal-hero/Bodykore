interface WhatWeDoProps {
    img: string
    title1: string
    title2: string
    description1: string
    description2: string   
}

export default function WhatWeDo({ title1, title2, description1, description2, img }: WhatWeDoProps) {
    return (
        <>
        <section className="max-w-7xl m-auto">
            <div className='flex flex-wrap justify-center items-center w-full h-fit py-10 lg:py-14 max-w-7xl m-auto'>
                <div className='pb-16 lg:pb-2 lg:pr-36'>
                    <img src={img} alt="" />
                </div>
                <div className='mx-5 lg:mx-0 lg:w-2/5'>
                    <div className='flex justify-center lg:justify-start font-bebas italic font-bold text-5xl pb-4'>
                        <h1 className='text-black-373933 pr-2' style={{ letterSpacing: '1px' }}>{title1}</h1>
                        <h1 className='text-red-bc2026' style={{ letterSpacing: '1px' }}>{title2}</h1>
                    </div>
                    <p className='font-roboto text-black-1c2023 leading-relaxed text-center lg:text-left'>{description1}</p>
                    <p className='font-roboto text-black-1c2023 leading-relaxed text-center lg:text-left pt-5'>{description2}</p>
                </div>
            </div>
        </section>
        </>
    )
}
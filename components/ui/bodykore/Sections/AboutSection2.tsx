interface WeAreBKProps {
    title1: string
    title2: string
    description1: string
    description2: string
    btnText: string
    img: string
}

export default function WeAreBK({ title1, title2, description1, description2, btnText, img }: WeAreBKProps) {
    return (
        <>
        <section className="max-w-7xl m-auto">
            <div className='flex flex-wrap justify-center w-full h-fit max-w-7xl m-auto'>
                <div className='mx-5 lg:mx-0 lg:w-2/5'>
                    <div className='flex justify-center lg:justify-start font-bebas italic font-bold text-5xl pb-4'>
                        <h1 className='text-black-373933 text-3xl lg:text-5xl pr-2' style={{ letterSpacing: '1px' }}>{title1}</h1>
                        <h1 className='text-red-bc2026  text-3xl lg:text-5xl' style={{ letterSpacing: '1px' }}>{title2}</h1>
                    </div>
                        
                    <p className='font-roboto text-black-1c2023 leading-relaxed text-center lg:text-left'>{description1}</p>
                    <p className='font-roboto text-black-1c2023 leading-relaxed text-center lg:text-left pt-5'>{description2}</p>
                        
                    <div className='flex justify-center lg:justify-start'>
                        <button className='w-48 h-12 mt-5 bg-transparent text-black hover:text-red-bc2026 border-2 border-black hover:border-red-bc2026 rounded-lg font-bebas' style={{ letterSpacing: '1.5px' }}>
                            {btnText}
                        </button>
                    </div>
                </div>
                    
                <div className='pt-16 lg:pt-0 lg:pl-36'>
                    <img src={img} alt="" />
                </div>
            </div>
        </section>
        </>
    )
}
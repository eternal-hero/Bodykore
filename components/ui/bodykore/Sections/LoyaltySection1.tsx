interface DiscountProps {
    discount: string
    points: string
}

interface LoyaltySection1Props {
    title1: string
    title2: string
    description: string
    points: string
    btnText: string
    discountRow1: DiscountProps []
    discountRow2: DiscountProps []
}

export default function LoyaltySection1({ title1, title2, description, points, btnText, discountRow1, discountRow2 }: LoyaltySection1Props) {
    return (
        <>
        <section className="w-full">
            <div className="w-full pt-56">
            <div className="h-4 bg-red-bc2026"></div>
            <div className='bg-black h-fit py-64'>
                <div className="flex flex-wrap justify-center max-w-7xl m-auto">
                    <div className='md:pr-20 lg:pr-44'>
                        <div className="flex justify-center w-96 lg:justify-start">
                            <h1 className="text-white-f2f9fa text-5xl font-bebas font-bold italic">{title1}</h1>
                            <h1 className="text-red-bc2026 pl-2 text-5xl font-bebas font-bold italic">{title2}</h1>  
                        </div>
                        <p className="w-96 text-white-f2f9fa pt-6 text-md font-roboto leading-7 text-center lg:text-left pb-3">
                            {description}
                        </p>
                        <h1 className='text-red-bc2026 font-bebas text-lg text-center lg:text-left' style={{ letterSpacing: '1px' }}>{points}</h1>
                        <div className='text-center lg:text-left'>
                            <button className='w-48 h-12 mt-5 bg-transparent text-white hover:text-red-bc2026 border-2 border-white hover:border-red-bc2026 rounded-lg font-bebas' style={{ letterSpacing: '1.5px' }}>
                                {btnText}
                            </button>
                        </div>   
                    </div>
                    <div className='pt-24 md:pt-0'>
                        <div className='flex justify-between pb-10'>
                            {discountRow1.map((d, i) => {
                                return (
                                    <div className='px-5' key={i}>
                                        <h1 className='text-white font-bebas text-4xl font-bold text-center italic'>{d.discount}</h1>
                                        <p className='text-white font-bebas text-lg text-center'>{d.points}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='flex justify-between'>
                            {discountRow2.map((d, i) => {
                                return (
                                    <div className='px-5' key={i}>
                                        <h1 className='text-white font-bebas text-4xl font-bold text-center italic'>{d.discount}</h1>
                                        <p className='text-white font-bebas text-lg text-center'>{d.points}</p>
                                    </div>
                                )
                            })}
                        </div>  
                    </div>
                </div>  
            </div>  
            <div className="w-full h-4 bg-red-bc2026"></div>
        </div>
        </section>
        </>
    )
}
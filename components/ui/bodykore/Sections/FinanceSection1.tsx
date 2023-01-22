interface FinanceSection1Props {
    title1: string
    title2: string
    text: string
    bkLogo: string
    plus: string
    affirmLogo: string
}

export default function FinanceSection1({ title1, title2, text, bkLogo, plus, affirmLogo }: FinanceSection1Props) {
    return (
        <>
        <section className="max-w-7xl m-auto">
            <div id='belowBanner' className='flex flex-wrap justify-center max-w-7xl m-auto gap-8'>
                <div className='lg:w-2/5 lg:mr-24'>
                    <div className='flex justify-center lg:justify-start pb-4'>
                        <h1 className="text-black text-5xl font-bebas font-bold italic">{title1}</h1>
                        <h1 className="text-red-bc2026 pl-2 text-5xl font-bebas font-bold italic">{title2}</h1>  
                    </div>
                    <p className='text-black text-center lg:text-left px-10 lg:px-0'>{text}</p>
                </div>

                <div className='flex px-16 lg:px-0 pt-20 lg:pt-0'>
                    <div>
                    <img className='' src={bkLogo} alt="" />  
                    </div>
                    <div className='flex justify-center pt-10'>
                        <h1 className='font-bold text-6xl'>{plus}</h1>
                    </div>
                    <div className='flex justify-end pt-24'>
                        <img className='flex justify-end' src={affirmLogo} alt="" style={{ width: '219px', height: '111px' }} />  
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
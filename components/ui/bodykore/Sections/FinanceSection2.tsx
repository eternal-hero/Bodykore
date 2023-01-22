interface OptionsProps {
    num: string
    text: string
}

interface FinanceSection2Props {
    options: OptionsProps []
    title1: string
    title2: string
    text: string
    subText: string
}

export default function FinanceSection2({ options, title1, title2, text, subText }: FinanceSection2Props) {
    return (
        <>
        <section>
            <div className="w-full pt-56">
                <div className="h-4 bg-red-bc2026"></div>
                <div className='bg-black h-fit py-52'>
                    <div className="flex flex-wrap-reverse justify-center gap-32 lg:gap-36 max-w-7xl m-auto px-8">
                        <div className='pt-0 lg:pt-24 md:pt-20 flex flex-wrap justify-center'>
                            {options.map((o, i) => {
                                return (
                                    <div className='px-8' key={i}>
                                        <h1 className='text-white font-bebas text-4xl font-bold text-center italic'>{o.num}</h1>
                                    <   p className='text-white font-bebas text-lg text-center'>{o.text}</p>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='w-2/5 pt-10 lg:pt-0'>
                            <div className="flex justify-center lg:justify-start">
                                <h1 className="text-red-bc2026 text-5xl font-bebas font-bold italic">{title1}</h1> 
                                <h1 className="text-white-f2f9fa pl-2 text-5xl font-bebas font-bold italic">{title2}</h1>   
                            </div>
                            <p className="text-white-f2f9fa pt-6 text-md font-roboto leading-7 text-center lg:text-left pb-3">
                                {text}
                            </p>
                            <p className="text-white-f2f9fa pt-1 text-xs font-roboto leading-5 text-center lg:text-left pb-3">{subText}</p> 
                        </div>
                    </div>  
                </div>  
                <div className="w-full h-4 bg-red-bc2026"></div>
            </div>
        </section>
        </>
    )
}
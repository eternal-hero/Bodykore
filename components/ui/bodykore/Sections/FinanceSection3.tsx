interface OptionsProps {
    num: string
    title: string
    description: string
}

interface FinanceSection3Props {
    title: string
    options: OptionsProps[]
}

export default function FinanceSection3({ title, options }: FinanceSection3Props) {
    return (
        <>
        <section className="max-w-7xl m-auto">
            <div id='belowBanner' className='w-full h-fit max-w-7xl m-auto pt-44'>
                <div className="text-center" style={{ letterSpacing: '1px' }}>
                    <div className="flex justify-center font-bebas text-5xl font-bold italic">
                        <h1 className="text-black-373933 pr-2">{title}</h1>
                    </div>
                </div>
                <div className='flex flex-wrap justify-center lg:justify-between pt-20 lg:pt-16'>
                    {options.map((o, i) => {
                        return (
                            <div className='w-1/3 lg:w-80 mx-28 lg:mx-0 py-8' key={i}>
                                <h1 className='font-bebas text-7xl font-bold italic text-center text-red-bc2026' style={{ letterSpacing: '1px' }}>{o.num}</h1>
                                <h1 className='font-bebas text-3xl font-semibold italic text-center mt-4' style={{ letterSpacing: '1px' }}>{o.title}</h1>
                                <p className='text-center px-0 md:px-10'>{o.description}</p>  
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
        </>
    )
}
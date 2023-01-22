import Link from 'next/link'

interface OptionsProps {
    icon: string
    title: string
    description: string
}
interface LoyaltySection2Props {
    title: string
    optionsRow1: OptionsProps[]
    optionsRow2: OptionsProps[]
}

export default function LoyaltySection2({ title, optionsRow1, optionsRow2 }: LoyaltySection2Props) {
    return (
        <>
        <section>
            <div className='w-full h-fit max-w-7xl m-auto pt-44'>
                <div className="text-center" style={{ letterSpacing: '1px' }}>
                    <div className="flex justify-center font-bebas text-5xl font-bold italic">
                        <h1 className="text-black-373933 pr-2">{title}</h1>
                    </div>
                </div>
                <div className='flex flex-wrap justify-center lg:justify-between pt-20 lg:mx-32 lg:pt-16'>
                    {optionsRow1.map((o, i) => {
                        return (
                            <div className='w-1/3 lg:w-1/4 mx-28 lg:mx-0 showhim h-48' key={i}>
                                <div className="">
                                    <div className='flex justify-center pb-1 ok'>
                                        <img src={o.icon} alt=""/>
                                    </div>
                                    <h1 className='font-bebas text-4xl font-semibold italic text-center mt-4 ok' style={{ letterSpacing: '1px' }}>{o.title}</h1>
                                    <p className='text-center ok'>{o.description}</p>
                                    <div className="showme hover:bg-black h-48 pt-6">
                                        <div className="flex justify-center pt-5">
                                            <Link href={'/auth/signup'}>
                                            <button className="bg-transparent font-semibold hover:bg-white text-white hover:text-black py-3 px-14 border-2 border-white hover:border-transparent rounded-lg text-md " style={{ letterSpacing: '1.5px' }}>
                                                SIGN UP
                                            </button>
                                            </Link>
                                        </div>
                                        <div className="flex justify-center pt-3">
                                            <span
                                            className="text-red-bc2026"
                                            >
                                                <span
                                                className="text-white-f2f9fa pr-2"
                                                >
                                                Already a member?
                                                </span>
                                                <Link href={'/auth/signin'}>
                                                Log in
                                                </Link>
                                            </span> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='flex flex-wrap justify-center lg:justify-between pt-10 lg:mx-32 lg:pt-8'>
                    {optionsRow2.map((o, i) => {
                        return (
                            <div className='w-1/3 lg:w-1/4 mx-28 lg:mx-0 pb-8 showhim h-48' key={i}>
                                <div className='flex justify-center pb-1 py-8 ok'>
                                    <img src={o.icon} alt="" />
                                </div>
                                <h1 className='font-bebas text-4xl font-semibold italic text-center mt-4 ok' style={{ letterSpacing: '1px' }}>{o.title}</h1>
                                <p className='text-center ok'>{o.description}</p>
                                <div className="showme hover:bg-black h-48 pt-6 mx-2">
                                        <div className="flex justify-center pt-5">
                                            <Link href={'/auth/signup'}>
                                            <button className="bg-transparent font-semibold hover:bg-white text-white hover:text-black py-3 px-14 border-2 border-white hover:border-transparent rounded-lg text-md " style={{ letterSpacing: '1.5px' }}>
                                                SIGN UP
                                            </button>
                                            </Link>
                                        </div>
                                        <div className="flex justify-center pt-3">
                                            <span
                                            className="text-red-bc2026 cursor-pointer"
                                            >
                                                <span
                                                className="text-white-f2f9fa pr-2"
                                                >
                                                Already a member?
                                                </span>
                                                <Link href={'/auth/signin'}>
                                                Log in
                                                </Link>
                                            </span> 
                                        </div>
                                    </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
        </>
    )
}
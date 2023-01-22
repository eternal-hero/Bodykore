import Link from 'next/link'

interface LoyaltySection3Props {
    title1: string
    title2: string
    description: string
    btnText1: string
    btnText2: string
}

export default function LoyaltySection3({ title1, title2, description, btnText1, btnText2 }: LoyaltySection3Props) {
    return (
        <>
        <section className="w-full">
            <div className="bg-no-repeat h-screen w-full bg-center bg-cover bg-referFriend-image mt-52 flex">
                <div className='w-3/6'></div>
                <div className='max-w-7xl m-auto'>
                    <div className="flex">
                        <h1 className="text-white-f2f9fa text-5xl font-bebas font-bold italic">{title1}</h1>
                        <h1 className="text-red-bc2026 pl-2 text-5xl font-bebas font-bold italic">{title2}</h1>  
                    </div>
                    <div className='w-2/3'>
                        <p className='text-white' style={{ letterSpacing: '0.5px' }}>{description}</p>
                    </div>
                    <div className='flex flex-wrap mt-8'>
                        <Link href={'/auth/signup'}>
                            <button className="bg-transparent font-semibold hover:bg-white text-white hover:text-black my-2 lg:my-0 md:mr-4 py-3 px-10 border-2 border-white hover:border-transparent rounded-lg text-md " style={{ letterSpacing: '1.5px' }}>
                                {btnText1}
                            </button>
                        </Link>
                        <Link href={'/auth/signin'}>
                            <button className="bg-transparent font-semibold hover:bg-white text-white hover:text-black my-2 lg:my-0 py-3 px-20 border-2 border-white hover:border-transparent rounded-lg text-md " style={{ letterSpacing: '1.5px' }}>
                                {btnText2}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
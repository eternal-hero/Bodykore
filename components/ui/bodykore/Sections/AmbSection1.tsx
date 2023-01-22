import Link from 'next/link';

interface BecomeAnAmbProps {
    title1: string
    title2: string
    text: string
    btnText1: string
    btnText2: string
    img: string
    link: string
}

export default function BecomeAnAmb({ title1, title2, text, btnText1, btnText2, img, link }: BecomeAnAmbProps) {
    return (
        <>
        <section className="w-full">
            <div className='flex flex-wrap justify-center w-full h-fit pt-56 lg:pt-64 max-w-7xl m-auto'>
                <div className='mx-20 lg:mx-0 lg:w-2/5'>
                    <div className='flex justify-center lg:pt-10 lg:justify-start text-center lg:text-left font-bebas italic font-bold text-4xl lg:text-5xl pb-4'>
                    <span
                       className='text-red-bc2026'
                    >
                        <span
                         className='text-black-373933 pr-2' style={{ letterSpacing: '1px' }}
                        >
                        {title1}
                        </span>
                        {title2}
                    </span>
                    </div>

                <p className='font-roboto text-black-373933 text-center lg:text-left leading-relaxed'>{text}</p>
                <div className='flex flex-wrap justify-center lg:justify-start font-bebas'>
                    <button className='w-48 h-12 mt-5 mx-4 lg:ml-0 bg-transparent text-black-373933 font-bold border border-black-373933 hover:text-red-bc2026 hover:border-red-bc2026 rounded-lg' style={{ letterSpacing: '2px' }}>
                        {btnText1}
                    </button>
                    <Link href={`${link}`}>  
                        <button className='w-48 h-12 mt-5 bg-transparent text-black-373933 font-bold border border-black-373933 hover:text-red-bc2026 hover:border-red-bc2026 rounded-lg' style={{ letterSpacing: '2px' }}>
                            {btnText2}
                        </button>
                    </Link>
                </div> 
                </div>
                <div className='pt-16 lg:pt-0 lg:pl-20'>
                <img src={img} alt="" />
                </div>
            </div>
        </section>
        </>
    )
}
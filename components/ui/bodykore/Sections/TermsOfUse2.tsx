import Link from 'next/link'

interface TermsOfUse2Props {
    title: string
    text1?:string
    text2?:string
    link: string
}

export default function TermsOfUse2({ title, text1, text2, link }: TermsOfUse2Props) {
    return (
        <>
        <section>
            <div className="lg:flex text-center font-bebas text-4xl lg:text-5xl font-bold italic px-16 max-w-7xl m-auto">
                <h1 className="text-black-373933">{title}</h1>
            </div>
            <div className='px-16 mt-2 max-w-7xl m-auto'>
                <div className='font-roboto text-center lg:text-left'>
                    <span className="text-red-bc2026">
                        <span
                        className='pr-2 text-black'
                        >
                        {text1}
                        </span>
                        <Link href={link} passHref>
                            {text2}
                        </Link>
                    </span>
                </div>                     
            </div>
        </section>
        </>
    )
}
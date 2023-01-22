interface ParagraphsProps {
    text: string
}

interface TermsOfUseProps {
    title: string
    paragraphs: ParagraphsProps[]
    text1?:string
    text2?:string
    text3?:string
}

export default function TermsOfUse({ title, paragraphs, text1, text2, text3 }: TermsOfUseProps) {
    return (
        <>
        <section>
            <div className="lg:flex text-center font-bebas text-4xl lg:text-5xl font-bold italic px-16 max-w-7xl m-auto">
                <h1 className="text-black-373933">{title}</h1>
            </div>
            <div className='px-16 mt-2 max-w-7xl m-auto'>
                <div className='font-roboto text-center lg:text-left'>
                    {paragraphs.map((p, i) => {
                        return (
                            <p key={i} className='pb-6' >{p.text}</p>
                        )
                    })}
                    <p>{text1}</p>
                    <p>{text2}</p>
                    <p>{text3}</p>
                </div>                     
            </div>
        </section>
        </>
    )
}
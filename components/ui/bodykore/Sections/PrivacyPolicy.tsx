interface ParagraphsProps {
    text: string
    pb?:string
}

interface PrivacyPolicyProps {
    title?: string
    subTitle?: string
    pb?: string
    paragraphs: ParagraphsProps[]
}

export default function PrivacyPolicy({ title, subTitle, pb, paragraphs }: PrivacyPolicyProps) {
    return (
        <>
        <section>
            <div className="lg:flex text-center font-bebas text-4xl lg:text-5xl font-bold italic px-16 max-w-7xl m-auto">
                <h1 className="text-black-373933">{title}</h1>
            </div>
            <div className={`lg:flex text-center font-roboto text-xl lg:text-2xl font-bold px-16 max-w-7xl m-auto pt-2 ${pb}`}>
                <h1 className="text-black-373933">{subTitle}</h1>
            </div>
            <div className='px-16 max-w-7xl m-auto'>
                <div className='font-roboto text-center lg:text-left'>
                    {paragraphs.map((p, i) => {
                        return (
                            <p key={i} className={`${p.pb}`} >{p.text}</p>
                        )
                    })}
                </div>                     
            </div>
        </section>
        </>
    )
}
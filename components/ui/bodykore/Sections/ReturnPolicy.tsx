interface ParagraphsProps {
    text: string
}

interface ReturnPolicyProps {
    title: string
    subTitle: string
    text1: string
    text2: string
    paragraphs1: ParagraphsProps[]
    text3: string
    paragraphs2: ParagraphsProps[]
}

export default function ReturnPolicy({ title, subTitle, text1, text2, text3, paragraphs1, paragraphs2 }: ReturnPolicyProps) {
    return (
        <>
        <section className="pb-36">
            <div className="h-4 bg-red-bc2026"></div>
            <div className="lg:flex text-center font-bebas text-4xl lg:text-5xl font-bold italic pt-28 px-16 max-w-7xl m-auto">
                <h1 className="text-black-373933">{title}</h1>
            </div>
            <div className='px-16 mt-5 max-w-7xl m-auto'>
                <div className='font-roboto text-center lg:text-left'>
                    <p className='font-bold'>{subTitle}</p>
                    <p className='py-7'>{text1}</p>
                    <p className='pb-7'>{text2}</p>
                    {paragraphs1.map((p, i) => {
                        return (
                            <p key={i}>{p.text}</p>
                        )
                    })}
                    <p className='py-7'>{text3}</p>
                    {paragraphs2.map((p, i) => {
                        return (
                            <p key={i}>{p.text}</p>
                        )
                    })}
                </div>                     
            </div>
        </section>
        </>
    )
}

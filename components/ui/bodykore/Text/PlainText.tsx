interface ParagraphsProps {
    description?: string;
}

interface PlainProps {
    paragraphs: ParagraphsProps[]
    textColor?: String
    textPosition?: string
    textSize?: string
}

export default function PlainText({ paragraphs, textColor, textPosition, textSize }: PlainProps) {
    return (
        <>
        <section className="max-w-7xl m-auto">
            {paragraphs.map((p, i) => {
                return (
                    <p key={i} className={`${textColor} font-roboto text-center ${textPosition} ${textSize}`}>{p.description}</p>
                )
            })}  
        </section>
        </>
    )
}
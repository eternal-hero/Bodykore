interface ParagraphsProps {
    text: string
}

interface CatPackagesSection1Props {
    title1?: string;
    title2?: string
    paragraphs: ParagraphsProps[]
    description?: string
    img?: string;
}

export default function CatPackagesSection1({ title1, title2, paragraphs, description, img }: CatPackagesSection1Props) {
    return (
        <>
        <section className="max-w-7xl m-auto px-8">
            <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-32">
                <div className='md:w-2/4'>
                    <div className="leading-none text-center lg:text-left">
                        <span className="text-4xl lg:text-5xl text-red-bc2026 font-bebas font-bold italic text-center lg:text-left">
                            <span
                            className='text-black-373933 pr-2'
                            >
                            {title1}
                            </span>
                            {title2}
                        </span>
                    </div>
                    <div className="pt-2">
                        {paragraphs.map((p, i) => {
                            return (
                                <p key={i} className="text-black-373933 font-roboto py-3 text-center lg:text-left">{p.text}</p>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <img src={img} alt="" />
                </div>
            </div>   
        </section>
        </>
    )
}
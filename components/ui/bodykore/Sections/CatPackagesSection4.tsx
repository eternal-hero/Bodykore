interface ParagraphsProps {
    text: string
}

interface CatPackagesSection4Props {
    title1?: String
    title2?: string
    paragraphs: ParagraphsProps[]
    description?: String
    bgImage?: String
    heightbg?: string 
    heightGradient?: string
}

export default function CatPackagesSection4({ title1, title2, paragraphs, bgImage, heightbg, heightGradient }: CatPackagesSection4Props) {
    return (
        <>
            {/*Main Image*/}
            <div className="h-4 bg-red-bc2026"></div>
            <div className={`bg-no-repeat w-full bg-center bg-cover`} style={{ height: `${heightbg}` , backgroundImage: `url('${bgImage}'`}}>
                <div className={`bg-gradient-to-r from-black via-black to-transparent w-full flex items-center`} style={{ height: `${heightGradient}`}} >
                   <div className="flex flex-row max-w-7xl m-auto">
                        <div className="text-white md:w-1/2">
                            <div className="flex px-14 gap-2">
                                <h1 className="font-bebas text-5xl font-bold italic text-center md:text-left" style={{ letterSpacing: '2px' }}>{title1}</h1>
                                <h1 className="font-bebas text-5xl font-bold italic text-center md:text-left text-red-bc2026" style={{ letterSpacing: '2px' }}>{title2}</h1>
                            </div>
                            {paragraphs.map((p, i) => {
                                return (
                                    <p key={i} className="font-roboto text-sm pt-6 px-12 text-center md:text-left">{p.text}</p>
                                )
                            })}
                            
                        </div>
                        <div className="w-1/2"></div>
                    </div>      
                </div>
            </div>
        </>
    )
}
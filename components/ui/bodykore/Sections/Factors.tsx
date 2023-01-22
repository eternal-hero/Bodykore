
interface FacProps {
    icon?: string
    title?: string
    description?: string
}

interface FactorsProps {
    factors: FacProps[]
    textSize?: string
    division?: string
    imgWidth?: string
    imgHeight?: string
}

export default function Factors({ factors, textSize, division, imgHeight, imgWidth }: FactorsProps) {
    return (
        <section className="max-w-7xl m-auto">
            <div className={`flex flex-wrap flex-row items-center ${division}`}>
                {factors.map((f, i) => {
                    return (
                        <div key={i} className="w-full lg:w-1/3 h-16 flex flex-row justify-between items-center">
                            <div className="w-24 flex justify-center">
                                <img src={f.icon} alt="" className={`${imgHeight} ${imgWidth}`} />
                            </div>
                            <div className="w-80">
                            <p className={`font-bebas italic text-black-373933 text-xl leading-tight`} style={{ letterSpacing: '0.5px' }}>{f.title}</p>
                                <p className={`font-roboto text-black-373933 text-base ${textSize}`} style={{ letterSpacing: '0.5px' }}>{f.description}</p>
                            </div>
                        </div>
                    )
                })}
                
            </div>
        </section>
    )
}
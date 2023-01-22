import Image from "next/image"

interface cardProps {
    svg: string,
    title1?: string,
    title2?: string,
    description?: string,
}

interface LogoDescriptionProps {
    card: cardProps[],
}

export default function LogoDescription({ card }: LogoDescriptionProps) {
    return (
        <>
        <section className="max-w-7xl m-auto lg:px-28 pb-28">
            <div className="flex flex-wrap justify-center gap-16">
                {card.map((c, i) => {
                    return (
                        <div className="" style={{ width: '308px' }} key={i}>
                            <div className="flex justify-center pt-10" key={i}>
                                <Image src={c.svg}  width={80} height={67} alt=""/>
                            </div>
                            <div className="py-3" key={i}>
                            <h1 key={i} className="text-black-373933 text-4xl font-bebas font-bold italic text-center" style={{ letterSpacing: '1px'}}>{c.title1}</h1>
                            <h1 key={i} className="text-black-373933 text-4xl font-bebas font-bold italic text-center pt-1" style={{ letterSpacing: '1px'}}>{c.title2}</h1>
                            </div> 
                            
                            <p key={i} className="text-sm font-roboto text-black-1c2023 text-center">{c.description}</p>
                        </div>
                    )
                })} 
            </div> 
        </section>
        </>
    )
}
interface OptionsProps {
    icon: string
    title: string
    description: string
}

interface HomeSection1Props {
    options: OptionsProps[]
}

export default function HomeSection1({ options }: HomeSection1Props) {
    return (
        <>
        <section>
            <div className="bg-black w-full text-white h-fit py-10 text-sm">
                <div className="flex flex-wrap max-w-7xl m-auto justify-center gap-20">
                    {options.map((o, i) => {
                        return (
                            <div className="flex flex-row w-64" key={i}>
                                <div className="mt-2">
                                    <img src={o.icon} alt="" />
                                </div>   
                                <div className="pl-2">
                                    <p className="font-acumin-pro pb-2">{o.title}</p>
                                    <p className="font-roboto text-gray-char">{o.description}</p>
                                </div>      
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
        </>
    )
}
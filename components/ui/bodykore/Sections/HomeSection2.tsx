interface OptionsProps {
    icon: string
    title: string
}

interface HomeSection2Props {
    title1: string
    title2: string
    description: string
    options: OptionsProps[]
}

export default function HomeSection2({ title1, title2, description, options }: HomeSection2Props) {
    return (
        <>
        <section className="w-full border-t-8 border-b-8 border-red-bc2026 bg-black py-10 sm:py-16">
          
                <div className="h-fit justify-center text-center pt-5 sm:pb-7">
                <div className='w-full flex flex-col'>
                    <div className="flex justify-center px-10">
                        <h1 className="text-red-bc2026 pr-2 text-2xl lg:text-5xl font-bebas font-bold italic tracking-wider">{title1}</h1>
                        <h1 className="text-white-f2f9fa text-2xl lg:text-5xl font-bebas font-bold italic tracking-wider">{title2}</h1>
                    </div>
                    <p className="text-white-f2f9fa px-12 lg:px-80 text-sm lg:text-md font-roboto w-full sm:w-3/4 flex m-auto">
                    {description}
                    </p>
                </div>
                </div>
                {/*Imagenes benefits*/}
               
                    <div className="flex flex-wrap justify-center md:justify-between xl:justify-between w-full text-white-f2f9fa h-fit text-sm max-w-7xl m-auto pt-5 sm:pt-12">
                        {options.map((o, i) => {
                            return (
                                <div className="px-5 py-5" key={i}>
                                    <div className="flex justify-center">
                                        <img src={o.icon} alt="" />
                                    </div>
                                    <p className="font-acumin-pro pt-4 text-center w-32">{o.title}</p>  
                                </div>
                            )
                        })}
                    </div>
               
          
 
        </section>
        </>
    )
}
interface IconsProps{
    icon: string
    title: string
}
interface AmbBannerProps {
    title1: string
    title2: string
    description: string
    iconsRow1: IconsProps[]
    iconsRow2: IconsProps[]
}

export default function AmbBanner({ title1, title2, description, iconsRow1, iconsRow2 }: AmbBannerProps) {
    return (
        <>
        <section className="w-full">
            <div className="h-4 bg-red-bc2026"></div>
            <div className="h-fit bg-black justify-center text-center">
                <div className="flex flex-wrap justify-center pt-28 max-w-7xl m-auto">
                    <span
                       className="text-red-bc2026 text-5xl font-bebas font-bold italic"
                    >
                        <span
                          className="text-white-f2f9fa text-5xl pr-2 font-bebas font-bold italic"
                        >
                        {title1}
                        </span>
                        {title2}
                    </span>  
                </div>
                <p className="text-white-f2f9fa px-20 lg:px-64 xl:px-96 pt-6 text-md font-roboto leading-7 max-w-7xl m-auto">
                {description}
                </p>
            </div>
            <div className="bg-black">
                <div className='flex flex-wrap justify-center pt-16 md:gap-28 lg:gap-44 max-w-7xl m-auto'>
                    {iconsRow1.map((icon, i) => {
                        return (
                            <div className='px-44 md:px-0 py-16 md:py-0' key={i}>
                                <div className='flex justify-center'>
                                    <img src={icon.icon} alt="" />
                                </div> 
                                <h1 className='font-bebas text-4xl font-semibold italic text-white text-center pt-5'>{icon.title}</h1>
                            </div>
                        )
                    })}
                </div>
                <div className='flex flex-wrap justify-center gap-10 md:gap-28 lg:gap-44 md:py-10 max-w-7xl m-auto'>
                    {iconsRow2.map((icon, i) => {
                        return (
                            <div className='px-44 md:px-0 py-16 md:py-0 md:pb-20' key={i}>
                                <div className='flex justify-center'>
                                    <img src={icon.icon} alt="" />
                                </div> 
                                <h1 className='font-bebas text-4xl font-semibold italic text-white text-center pt-5'>{icon.title}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full h-4 bg-red-bc2026"></div>
        </section>
        </>
    )
}
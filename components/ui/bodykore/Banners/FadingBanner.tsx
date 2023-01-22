interface FadingBannerProps {
    title?: String
    description?: String
    bgImage?: String
    height: string 
}

export default function FadingBanner({ title, description, bgImage, height }: FadingBannerProps) {
    return (
        <>
            {/*Main Image*/}
            <div className={`bg-no-repeat ${height} w-full bg-center bg-cover ${bgImage}`}>
                <div className={`bg-gradient-to-r from-black via-black to-transparent ${height} w-full flex items-center justify-center`}>
                    <div className="text-white text-center lg:w-1/2 max-w-7xl m-auto">
                        <h1 className="font-bebas text-5xl font-bold italic" style={{ letterSpacing: '2px' }}>{title}</h1>
                        <p className="font-roboto pt-2 text-sm px-8">{description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
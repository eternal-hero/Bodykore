import Link from 'next/link';

interface CatPackagesSection3Props {
    title: string
    description: string
    btnText: string
    bgImage: string
    slug: string
}

export default function CatPackagesSection3({ title, description="", btnText, bgImage, slug }: CatPackagesSection3Props) {
    const scrollDown = () => {
        const element = document.getElementById('belowBanner');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }

    return (
        <>
            {/*Main Image*/}
            <div className={`bg-no-repeat h-screen w-full bg-center bg-cover flex justify-center items-center`} style={{ backgroundImage: `url('${bgImage}'` }}>
                <div className="mt-24 text-center text-white max-w-7xl">
                    {/*Title*/}
                    <div className="flex justify-center">
                        <h1 className="lg:text-8xl text-6xl w-4/6 italic font-bebas font-bold" style={{ letterSpacing: '4px' }}>{title}</h1>
                    </div>
                    {/*Description*/}
                    <div className="flex justify-center">
                        <p className='w-3/5 pt-10 font-roboto'>{description}</p>
                    </div>
                    {/*Button*/}
                    <div className="flex gap-4 w-full justify-center font-bebas font-bold px-32">
                        <Link href={`/${slug}`} passHref>
                            <button className={`mt-16 lg:mt-10 'bg-transparent hover:bg-white text-white hover:text-black' : 'bg-white hover:bg-transparent hover:text-black hover:text-white'} py-3 px-20 border-2 border-white hover:border-transparent rounded-lg text-md`} style={{ letterSpacing: '1.5px' }}>
                                {btnText}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
interface ListProps {
    text?: string
}

interface TermsOfUse3Props {
    title: string
    text?:string
    list: ListProps[];
}

export default function TermsOfUse3({ title, text, list }: TermsOfUse3Props) {
    return (
        <>
        <section className="pb-32">
            <div className="lg:flex text-center font-bebas text-4xl lg:text-5xl font-bold italic px-16 max-w-7xl m-auto">
                <h1 className="text-black-373933">{title}</h1>
            </div>
            <div className='px-16 mt-5 max-w-7xl m-auto'>
                <div className='font-roboto'>
                    <p className="pb-3 text-center lg:text-left">{text}</p>
                    {list.map((l, i) => {
                            return (
                            <div key={i}>
                                <ul className='list-disc pl-5 py-3'>
                                    <li>
                                    <div className={`font-roboto`}>
                                        {l.text}
                                    </div>           
                                    </li>
                                </ul>
                            </div>

                            )
                    })}
                </div>                     
            </div>
        </section>
        </>
    )
}
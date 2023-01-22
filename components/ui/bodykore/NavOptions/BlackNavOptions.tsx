interface OptionProps {
    icon?: string
    text?: string,
    id: string
}

interface BlackNavOptionsProps {
    options: OptionProps[]
    height?: string
}

export default function BlackNavOptions({ options, height }: BlackNavOptionsProps ) {
    
    const scrollDown = (id : string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }

    return (
        <>
            {/*Main Image*/}


            <section className="">
      <div className={`flex flex-wrap flex-row justify-center items-center`}>
      {options.map((o, i) => {
                    return (
                        <div key={i} className="flex gap-5 px-10">
                            <img src={o.icon} alt="" />
                            <h5 className="cursor-pointer text-white-f2f9fa m-auto" onClick={() => scrollDown(o.id)}>{o.text}</h5>
                        </div>
                    )
                })}
        </div>
        </section>

        </>
    )
}
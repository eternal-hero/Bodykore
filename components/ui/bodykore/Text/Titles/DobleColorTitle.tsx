interface DobleColorTitleProps {
    title?: string;
    title2?: string
    id?: string
}

export default function DobleColorTitle({ title, title2, id }: DobleColorTitleProps) {
    return (
        <>
        <section id={id} className="max-w-7xl m-auto">
            <div className="lg:flex text-center font-bebas text-4xl lg:text-5xl font-bold italic pt-16 max-w-7xl m-auto">
                <h1 className="text-black-373933 pr-2">{title}</h1>
                <h1 className=" text-red-bc2026 pr-1">{title2}</h1>
            </div>     
        </section>
        </>
    )
}
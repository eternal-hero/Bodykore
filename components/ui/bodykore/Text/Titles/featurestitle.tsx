interface FeaturestitleProps {
    title?: string;
    textSize?: string;
    textColor?: string
    id?: string
}

export default function Featurestitle({ title, textSize, textColor, id }: FeaturestitleProps) {
    return (
        <>
        <section id={id} className="max-w-7xl m-auto">
            <div className="flex justify-center lg:justify-center pb-5">
                <h2 className={`${textColor} ${textSize} font-bebas font-bold italic text-left md:text-left`}>{title}</h2>
            </div>      
        </section>
        </>
    )
}
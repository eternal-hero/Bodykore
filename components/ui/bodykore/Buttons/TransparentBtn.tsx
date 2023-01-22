interface  TransparentBtnProps {
    icon?: string
    text?: string;
    width?: string;
    fontSize?: string;
    onClick?: () => void;
}

export default function TransparentBtn({ icon, text, width, fontSize, onClick }:  TransparentBtnProps) {
    return (
        <>
        <section className="max-w-7xl m-auto">
            <button className={`${width} ${fontSize} h-12 mb-2 bg-transparent text-black-373933 border-2 border-black-373933 rounded-lg font-bebas`} style={{ letterSpacing: '1.5px' }}
            onClick={onClick}>
                <div className="flex justify-center items-center gap-2">
                    <img src={icon} alt="" />
                    <h1 className="font-bold">{text}</h1>
                </div>
            </button>
        </section>
        </>
    )
}
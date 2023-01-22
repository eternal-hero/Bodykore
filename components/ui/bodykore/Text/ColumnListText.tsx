import { map } from "leaflet"

interface ListProps {
    text?: string;
}

interface DoubleTextProps {
    listText: ListProps[][];
}

export default function ColumnListText({ listText }: DoubleTextProps) {
    return (
        <>
            <section className="max-w-7xl m-auto">
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 lg:gap-28">
                    {listText.map((list, i) => {
                        return (
                            <div key={i} className="flex flex-col">
                                {list.map((e, i) => {
                                    return (
                                        <div className="flex items-center pt-1" key={i}>
                                            <div className="pr-2" key={i}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16.576" height="13.296" viewBox="0 0 16.576 13.296">
                                                    <path id="Unión_3" data-name="Unión 3" d="M-19394-8954.725l3.338-3.245,2.877,2.793,7.023-6.823,3.338,3.244-10.113,9.825-.014-.014-.246.24Z" transform="translate(19394.004 8962)" fill="#bc2026" />
                                                </svg>
                                            </div>
                                            <p key={i} className="text-black-373933 font-roboto">{e.text}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>

            </section>
        </>
    )
}
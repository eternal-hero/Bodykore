interface ListProps {
  text?: string
  subText?: string
  subText1?: string
  subText2?: string
}

interface PlainListProps {
  List: ListProps[];
  textColor?: string
  textSize?:string
}

const PlainList = ({ List, textColor, textSize }: PlainListProps) => {

  return (
    <section className='max-w-7xl m-auto'>
      {List.map((l, i) => {
            return (
              <div key={i}>
                <ul className='list-disc text-red-bc2026 pl-5'>
                    <li>
                      <div className={`font-roboto ${textColor} ${textSize}`}>
                          {l.text}
                      </div>           
                    </li>
                </ul>
                <p className={`font-roboto pl-10 ${textColor} ${textSize}`}>{l.subText}</p>
                <p className={`font-roboto pl-10 ${textColor} ${textSize}`}>{l.subText1}</p>
                <p className={`font-roboto pl-10 ${textColor} ${textSize}`}>{l.subText2}</p>
              </div>

            )
      })}
    </section>
  )
}

export default PlainList
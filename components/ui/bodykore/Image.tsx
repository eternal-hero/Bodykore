interface BtnProps {
  textBottomL?: string
  textBottomR?: string
  textTop?: string 
}

interface ImageProps {
  img?: string
  buttons: BtnProps[]
}

const Image = ({ img, buttons }: ImageProps) => {

  return (
    <section className='max-w-7xl m-auto pb-5'>
      <div className='flex justify-center'>
        <img className="relative object-contain w-96" src={img} alt=""></img>
          <div className="absolute">
            {buttons.map((b, i) => {
              return (
                <div key={i} className="rounded-full bg-red-bc2026 flex justify-center items-center font-bebas text-2xl text-white-f2f9fa">
                    {b.textBottomL}
                </div>
              )
            })}
          </div> 
      </div>  
    </section>
  )
}

export default Image
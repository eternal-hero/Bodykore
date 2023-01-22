interface TextRImgProps {
  title?: string;
  description?: string;
  img?: string;
}

export default function TextRImg({ title, description, img }: TextRImgProps) {
  return (
    <>
      <section className="flex lg:flex-row flex-wrap justify-center md:justify-start max-w-7xl m-auto px-6 py-6">
        <div className="md:w-1/2 w-96">
          <h1 className="text-black-373933 text-5xl font-bebas font-bold italic text-center lg:text-left">
            {title}
          </h1>
          <p className="text-black-373933 font-roboto py-6 text-center lg:text-left w-96">
            {description}
          </p>
        </div>
        <div className="md:w-1/2 w-96 pr-8">
          <img src={img} alt="" />
        </div>
      </section>
    </>
  );
}

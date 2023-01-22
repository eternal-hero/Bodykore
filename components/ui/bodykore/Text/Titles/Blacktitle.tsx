interface BlacktitleProps {
  title?: string;
  textSize?: string;
  textColor?: string;
  id?: string;
}

export default function Blacktitle({
  title,
  textSize,
  textColor,
  id,
}: BlacktitleProps) {
  return (
    <>
      <section id={id} className="max-w-7xl m-auto">
        <div className="pb-2">
          <h3
            className={`${textColor} ${textSize} font-bebas font-bold italic text-left md:text-left`}
          >
            {title}
          </h3>
        </div>
      </section>
    </>
  );
}

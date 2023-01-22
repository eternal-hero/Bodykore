interface SingleArticleProps {
  topic?: string;
  title: string;
  date: string;
  readingTime?: number;
  content: string;
}

export default function SingleArticle({
  topic,
  title,
  date,
  readingTime,
  content,
}: SingleArticleProps) {
  return (
    <>
      <section className="max-w-7xl m-auto">
        <div>
          <div className="text-center lg:text-left">
            <h5
              className="text-grey-8C8C8C font-bebas text-lg font-bold italic"
              style={{ letterSpacing: '0.5px' }}
            >
              {topic}
            </h5>
            <h3
              className="text-black-1c2023 font-bebas text-4xl font-bold italic py-2"
              style={{ letterSpacing: '0.5px' }}
            >
              {title}
            </h3>
            <div className="flex justify-center lg:justify-start pb-4">
              <span
                className="text-grey-8C8C8C font-roboto text-sm"
                style={{ letterSpacing: '0.5px' }}
              >
                {date}
              </span>
              <li
                className="text-grey-8C8C8C font-roboto text-sm pl-2 list-inside"
                style={{ letterSpacing: '0.5px' }}
              >
                {`${readingTime} min read`}
              </li>
            </div>
          </div>
          <div className="post">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </div>
      </section>
    </>
  );
}

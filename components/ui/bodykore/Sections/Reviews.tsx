import Image from 'next/image';
import React from 'react';
import { voteReview } from 'services/stamped';

interface ReviewProps {
  id: string;
  rating: number;
  name: string;
  date: string;
  title: string;
  description: string;
  numLikes: string;
  numDislikes: string;
}

const Reviews = ({ reviews }: { reviews: ReviewProps[] }) => {
  const mapRating = (rating: number) => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <Image
          src={Math.round(rating) > i ? '/svg/star.svg' : '/svg/starEmpty.svg'}
          width={22}
          height={21}
          key={i}
          alt=""
        />
      );
    }
    return arr;
  };

  const handleVote = async (index: number, vote: boolean) => {
    const res = await voteReview(reviews[index].id, vote);
    if (res) {
      if (vote) {
        document.getElementById(`${index}up`)?.setAttribute('fill', '#bc2026');
        document
          .getElementById(`${index}down`)
          ?.setAttribute('fill', '#373933');
      } else {
        document.getElementById(`${index}up`)?.setAttribute('fill', '#373933');
        document
          .getElementById(`${index}down`)
          ?.setAttribute('fill', '#bc2026');
      }
    }
  };

  return (
    <>
      {reviews.map((item, index) => (
        <section key={index} className="max-w-7xl m-auto">
          <div className="flex flex-row">
            <div>
              <div className="w-12 h-12 rounded-full bg-red-bc2026 mr-4 mt-1 flex justify-center items-center font-bebas text-2xl italic text-white-f2f9fa">
                {item.name.split(' ').map((i) => i.charAt(0).toUpperCase())}
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-row">
                <div className="w-2/4">
                  <h1 className="text-black-373933 font-bebas font-bold italic text-2xl w-2/4">
                    {item.name}
                  </h1>
                </div>
                <div className="w-2/4 flex justify-end">
                  <h1 className="text-gray-char font-roboto">{item.date}</h1>
                </div>
              </div>
              <div className="flex justify-center lg:justify-start pb-2">
                {mapRating(item.rating)}
              </div>
              <h1 className="text-black-373933 font-bebas font-bold italic text-2xl">
                {item.title}
              </h1>
              <p className="text-black-1c2023 font-roboto">
                {item.description}
              </p>
              <div className="flex justify-end items-center gap-3">
                <h1>Was this helpful?</h1>
                <button
                  onClick={() => {
                    handleVote(index, true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.76"
                    height="15.236"
                    viewBox="0 0 16.76 15.236"
                  >
                    <path
                      id={`${index}up`}
                      data-name="Icon material-thumb-up"
                      d="M1.5,16.736H4.547V7.594H1.5Zm16.76-8.38a1.528,1.528,0,0,0-1.524-1.524H11.929l.724-3.481.023-.244a1.147,1.147,0,0,0-.335-.808l-.808-.8L6.52,6.52a1.49,1.49,0,0,0-.449,1.074v7.618a1.528,1.528,0,0,0,1.524,1.524h6.856a1.513,1.513,0,0,0,1.4-.929l2.3-5.371a1.505,1.505,0,0,0,.107-.556V8.425l-.008-.008Z"
                      transform="translate(-1.5 -1.5)"
                      fill="#373933"
                    />
                  </svg>
                </button>
                <h1>{item.numLikes}</h1>
                <button
                  onClick={() => {
                    handleVote(index, false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.76"
                    height="15.236"
                    viewBox="0 0 16.76 15.236"
                  >
                    <path
                      id={`${index}down`}
                      data-name="Icon material-thumb-up"
                      d="M1.5,16.736H4.547V7.594H1.5Zm16.76-8.38a1.528,1.528,0,0,0-1.524-1.524H11.929l.724-3.481.023-.244a1.147,1.147,0,0,0-.335-.808l-.808-.8L6.52,6.52a1.49,1.49,0,0,0-.449,1.074v7.618a1.528,1.528,0,0,0,1.524,1.524h6.856a1.513,1.513,0,0,0,1.4-.929l2.3-5.371a1.505,1.505,0,0,0,.107-.556V8.425l-.008-.008Z"
                      transform="translate(18.26 16.736) rotate(180)"
                      fill="#373933"
                    />
                  </svg>
                </button>
                <h1>{item.numDislikes}</h1>
              </div>
            </div>
          </div>
          <div className="border-b text-gray-char max-w-7xl m-auto pt-2"></div>
        </section>
      ))}
    </>
  );
};

export default Reviews;

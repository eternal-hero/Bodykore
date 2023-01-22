import { Disclosure } from '@headlessui/react';
import { FormEventHandler, useState } from 'react';
import { createReview } from 'services/stamped';


interface ReviewFormProps {
  productId: string;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [submit, setSubmit] = useState(0);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (submit !== 0) {
      console.log('Stopped');
      return;
    }
    setSubmit(1);
    const authorName = event.currentTarget.author.value;
    const authorEmail = event.currentTarget.email.vale;
    const reviewTitle = event.currentTarget.reviewTitle.value;
    const reviewMessage = event.currentTarget.experience.value;
    const reviewRecommend = event.currentTarget.option.checked;
    
    const res = await createReview({
        productId,
        authorName,
        authorEmail,
        reviewTitle,
        reviewMessage,
        reviewRecommend,
        reviewRating: rating,
    });
    if (res) {
        console.log('Submitted');
        setSubmit(2);
    } else {
        // Failed to create review
        setSubmit(0);
    }
  };

  const mapStars = () => {
    const res = [];
    for (let i = 1; i <= 5; i++) {
      res.push(
        <img
          key={i}
          className="pr-1 cursor-pointer"
          src={rating >= i ? '/svg/star.svg' : '/svg/starEmpty.svg'}
          alt=""
          onClick={() => {
            setRating(i);
          }}
        />
      );
    }
    return res;
  };

  return (
    <div className="w-full px-4">
      <div className="w-full max-w-2xl p-2 mx-auto bg-white rounded-2xl">
        <Disclosure>
          {() => (
            <>
              <div className="flex justify-center">
                <Disclosure.Button
                  className={`flex justify-center font-medium text-left w-36 text-xs bg-transparent text-black-373933 border-2 border-black-373933 rounded-lg font-bebas' style={{ letterSpacing: '1.5px' }}`}
                >
                  <div className="flex justify-center items-center h-12 gap-2">
                    <img src="/svg/pencil.svg" alt="" />
                    <h1 className="font-bold">Write a review</h1>
                  </div>
                </Disclosure.Button>
              </div>
              <Disclosure.Panel className="px-4 pt-4 pb-2">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-row justify-center gap-14">
                    <div className="w-1/2">
                      <label
                        className="pb-1 block text-sm font-medium text-black-1c2023 sm:mt-px sm:pt-2"
                        htmlFor="author"
                      >
                        Name
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="author"
                          id="author"
                          className="max-w-lg shadow-sm block w-full text-sm border border-black-373933 pl-4 py-2"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <label
                        className="pb-1 block text-sm font-medium text-black-1c2023 sm:mt-px sm:pt-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="max-w-lg shadow-sm block w-full text-sm border border-black-373933 pl-4 py-2"
                          placeholder="john.smith@example.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-5">
                    <h1 className="font-medium text-sm text-black-1c2023 pb-1">
                      Rating
                    </h1>
                    <div className="flex justify-start">{mapStars()}</div>
                  </div>

                  <div className="w-full pt-5">
                    <label
                      className="pb-1 block text-sm font-medium text-black-1c2023"
                      htmlFor="reviewTitle"
                    >
                      Title of Review
                    </label>
                    <div className="">
                      <input
                        type="text"
                        name="reviewTitle"
                        id="reviewTitle"
                        className="shadow-sm block w-full text-sm border border-black-373933 pl-4 py-2"
                        placeholder="Give your review a title"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-5">
                    <label
                      className="pb-1 block text-sm font-medium text-black-1c2023 sm:mt-px sm:pt-2"
                      htmlFor="experience"
                    >
                      How was your overall experience?
                    </label>
                    <div className="mt-1 sm:mt-0">
                      <textarea
                        id="experience"
                        name="experience"
                        rows={3}
                        className="shadow-sm block w-full text-sm border border-black-373933 pl-4 pt-2"
                        defaultValue={''}
                        placeholder="Describe the experience with the product"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-7">
                    <div className="max-w-lg flex items-center gap-8">
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="option"
                            name="option"
                            type="checkbox"
                            className="focus:ring-red-bc2026 h-4 w-4 text-red-bc2026 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            className="font-medium text-gray-700"
                            htmlFor="checkbox"
                          >
                            I recommend this product
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 w-32 border border-transparent shadow-sm text-sm font-roboto rounded-lg text-white bg-black"
                        disabled={submit !== 0}
                      >
                        {submit === 0
                          ? 'Submit'
                          : submit === 1
                          ? 'Submitting...'
                          : 'Submitted'}
                      </button>
                    </div>
                  </div>
                </form>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

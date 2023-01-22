import React from 'react';
import { Technologies } from './Product';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Image from 'next/image';

type TechnologModal = {
  technology?: Technologies;
  closeModal: () => void;
  showModal: boolean;
};

export default function TechnologyModal({
  technology,
  closeModal,
  showModal,
}: TechnologModal) {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {technology?.title}
                  </h3>
                  <button
                    className="p-1 ml-auto  border-0 text-black float-right text-3xl leading-none font-semibold "
                    onClick={() => closeModal()}
                  >
                    <IoIosCloseCircleOutline style={{ color: '#000' }} />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overflow-y-scroll" style={{height:700}}>
                  <Image
                    src={technology!.image}
                    height={600}
                    width={800}
                    alt="image"
                    objectFit="contain"
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: technology!.description,
                    }}
                  ></div>
                </div>
                {/*footer*/}
               
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

import { useState } from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
interface ImgGalleryProps {
  images: { img: string }[];
  imgHeight: string;
  imgWidth: string;
}

export default function ImgGallery({
  images,
  imgHeight,
  imgWidth,
}: ImgGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setphotoIndex] = useState(0);
  return (
    <>
      <section className="max-w-7xl m-auto py-5">
        <div className="flex flex-wrap justify-center gap-1">
          {isOpen &&
            <Lightbox
              mainSrc={images[photoIndex].img}
              nextSrc={images[(photoIndex + 1) % images.length].img}
              prevSrc={images[(photoIndex + images.length - 1) % images.length].img}

              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() => setphotoIndex((photoIndex + images.length - 1) % images.length)}
              onMoveNextRequest={() => setphotoIndex((photoIndex + 1) % images.length)}
            />
          }
          {images.map((imgs, i) => {
            return (
              <div key={i}>
                <div className="flex justify-center">
                  <img onClick={()=>{setIsOpen(true);setphotoIndex(i)}}
                    className={`h-56 w-full object-contain`}
                    src={imgs.img}
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

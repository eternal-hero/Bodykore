import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { zip } from 'lodash';
import Image from 'next/image';
import React, { useRef } from 'react';

interface BgImageProps {
  url: string;
  btn3d?: boolean;
}

interface ImgPagSliderProps {
  bgImage: BgImageProps[];
  id?: string;
}


const ImgPagSlider = ({ bgImage }: ImgPagSliderProps) => {
  const sliderRef = useRef<any>();

  if (typeof window !== "undefined") {
    var thumbnails = document.getElementsByClassName( 'thumbnail' );
    var current: Element; // Keeps the current thumbnail
  }

  
  

  return (
    <section className="w-full max-w-7xl m-auto">
      <Splide
        ref={sliderRef}
        options={{
          pagination: false,
          gap: '1rem',
          type: 'loop',
          width: '100%',
          autoWidth: false,
        }}
        
        /*onClick={(splide) => {
          
          for ( var i = 0; i < thumbnails.length; i++ ) {
            initThumbnail( thumbnails[ i ], i );
          }
          
          function initThumbnail( thumbnail: Element, index: number ) {
            thumbnail.addEventListener( 'click', function () {
              splide.go( index );
            } );
          }
        }}*/
        
        onMoved={(splide) => {
          // Update the bar width. CSS is found on components.css
          if ( current ) {
            current.classList.remove( 'is-active' );
          }
        
          // Splide#index returns the latest slide index:
          var thumbnail = thumbnails[ splide.index ];
        
          if ( thumbnail ) {
            thumbnail.classList.add( 'is-active' );
            current = thumbnail;
          }
        }}
      >
        {bgImage.map((b, i) => {
          return (
            <SplideSlide key={i} className="flex">
              <img className="w-full" key={i} src={b.url} alt="" />
              
            </SplideSlide>
          );
        })}
      </Splide>
      
      <div id="thumbnails" className="thumbnails" >
        {bgImage.map((b, i) => {
          return (
              <div className="thumbnail" key={i}>
                <img src={b.url} alt="" />
              </div>
          );
        })}
      </div>
    </section>
  );
};

export default ImgPagSlider;

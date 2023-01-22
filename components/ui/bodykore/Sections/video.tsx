import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

interface VidoProps {
  url: string;
  title: string;
}

interface VideoProps {
  title1?: string;
  videos: VidoProps[];
  id?: string;
}

const Video = ({ title1, videos, id }: VideoProps) => {
  const sliderRef = useRef<any>();

  return (
    <div id={id} className="m-auto">
      <div className="flex flex-wrap justify-center lg:justify-start gap-2 h-full">
        {videos.map((video, i) => {
          return (
            <div key={i}>
              <ReactPlayer
                className="video_player_index"
                url={video.url}
                loop={true}
                controls={true}
                width="560px"
                height="315px"
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload',
                    },
                  },
                }}
                onPlay={() => {}}
              />
              <h5
                key={i}
                className="font-roboto text-md font-bold text-black-373933 pt-4 text-center"
              >
                {video.title}
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Video;

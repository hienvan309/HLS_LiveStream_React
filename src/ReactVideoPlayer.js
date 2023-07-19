import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const ReactVideoPlayer = ({ videoSource }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const player = videojs(videoElement);

    return () => {
      player.dispose();
    };
  }, []);

  return (
    <div className="video-container">
      <video ref={videoRef} preload='datameta' autoPlay className="video-js vjs-default-skin" controls>
        <source src={videoSource} type="application/x-mpegURL" />
      </video>
    </div>
  );
};

export default ReactVideoPlayer;
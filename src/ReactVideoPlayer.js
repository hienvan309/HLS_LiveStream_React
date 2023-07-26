import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js'; // Import thư viện hls.js
import 'video.js/dist/video-js.css';

const ReactVideoPlayer = ({ videoSource }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    let hls = null;

    if (Hls.isSupported()) {
      // Kiểm tra nếu trình duyệt hỗ trợ HLS
      hls = new Hls();

      // Tắt tính năng tự động tải các đoạn video sau khi play
      // hls.config.autoStartLoad = false;

      // Tắt tính năng tăng tốc phát lại
      hls.config.capLevelToPlayerSize = false;

      hls.loadSource(videoSource);
      hls.attachMedia(videoElement);
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Hỗ trợ trên Safari
      videoElement.src = videoSource;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoSource]);

  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay muted className="video-js vjs-default-skin" preload='datameta' controls>
      </video>
    </div>
  );
};

export default ReactVideoPlayer;

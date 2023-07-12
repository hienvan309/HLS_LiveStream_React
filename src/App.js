import React from 'react';
import ReactVideoPlayer from './ReactVideoPlayer';

const App = () => {
  return (
    <div className="app">
      <div className="row">
        <div className="column">
          <ReactVideoPlayer videoSource="http://171.244.62.138:8088/hls/stream.m3u8" />
        </div>
        <div className="column">
          <ReactVideoPlayer videoSource="http://171.244.62.138:8088/hls/stream.m3u8" />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <ReactVideoPlayer videoSource="https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8" />
        </div>
        <div className="column">
          <ReactVideoPlayer videoSource="https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8" />
        </div>
      </div>
    </div>
  );
};

export default App;
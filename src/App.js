import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactVideoPlayer from './ReactVideoPlayer';
import './App.css';

const App = () => {
  const [cameraData, setCameraData] = useState([]);
  const [selectedCameras, setSelectedCameras] = useState({});

  useEffect(() => {
    const fetchCameraData = async () => {
      try {
        const response = await axios.get('/api/v1/event/get-cameras');
        const data = response.data;
        setCameraData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCameraData();
  }, []);

  const handleCameraChange = (event, cameraId) => {
    const newSelectedCameras = { ...selectedCameras };
    newSelectedCameras[cameraId] = event.target.value;
    setSelectedCameras(newSelectedCameras);
  };

  return (
    <div className="app">
      <div className="video-container">
        <div className="video-player top-left">
          <div className="dropdown-container">
            <select
              value={selectedCameras['top-left'] || ''}
              onChange={(event) => handleCameraChange(event, 'top-left')}
            >
              <option value="" disabled>
                Select a camera
              </option>
              {cameraData.map((camera) => (
                <option key={camera.source_url} value={camera.source_url}>
                  {camera.source_url}
                </option>
              ))}
            </select>
          </div>
          {selectedCameras['top-left'] && (
            <ReactVideoPlayer
              videoSource={selectedCameras['top-left']}
            />
          )}
        </div>
        <div className="video-player top-right">
          <div className="dropdown-container">
            <select
              value={selectedCameras['top-right'] || ''}
              onChange={(event) => handleCameraChange(event, 'top-right')}
            >
              <option value="" disabled>
                Select a camera
              </option>
              {cameraData.map((camera) => (
                <option key={camera.source_url} value={camera.source_url}>
                  {camera.source_url}
                </option>
              ))}
            </select>
          </div>
          {selectedCameras['top-right'] && (
            <ReactVideoPlayer
              videoSource={selectedCameras['top-right']}
            />
          )}
        </div>
        <div className="video-player bottom-left">
          <div className="dropdown-container">
            <select
              value={selectedCameras['bottom-left'] || ''}
              onChange={(event) => handleCameraChange(event, 'bottom-left')}
            >
              <option value="" disabled>
                Select a camera
              </option>
              {cameraData.map((camera) => (
                <option key={camera.source_url} value={camera.source_url}>
                  {camera.source_url}
                </option>
              ))}
            </select>
          </div>
          {selectedCameras['bottom-left'] && (
            <ReactVideoPlayer
              videoSource={selectedCameras['bottom-left']}
            />
          )}
        </div>
        <div className="video-player bottom-right">
          <div className="dropdown-container">
            <select
              value={selectedCameras['bottom-right'] || ''}
              onChange={(event) => handleCameraChange(event, 'bottom-right')}
            >
              <option value="" disabled>
                Select a camera
              </option>
              {cameraData.map((camera) => (
                <option key={camera.source_url} value={camera.source_url}>
                  {camera.source_url}
                </option>
              ))}
            </select>
          </div>
          {selectedCameras['bottom-right'] && (
            <ReactVideoPlayer
              videoSource={selectedCameras['bottom-right']}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

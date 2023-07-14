// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormControl, MenuItem, Select } from '@mui/material';
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
        console.log(data);
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
      <div className="container">
        <div className="row">
          <div className="column">
            {cameraData.slice(0, 2).map((camera) => (
              <div className="dropdown-container" key={camera.source_url}>
                <FormControl>
                  <Select
                    value={selectedCameras[camera.source_url] || ''}
                    onChange={(event) => handleCameraChange(event, camera.source_url)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select a camera' }}
                  >
                    <MenuItem value="" disabled>
                      Select a camera
                    </MenuItem>
                    {cameraData.map((camera) => (
                      <MenuItem key={camera.source_url} value={camera.source_url}>
                        {camera.source_url}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            ))}
          </div>
        </div>
        <div className="row">
          <div className="column">
            {cameraData.slice(2, 4).map((camera) => (
              <div className="dropdown-container" key={camera.source_url}>
                <FormControl>
                  <Select
                    value={selectedCameras[camera.source_url] || ''}
                    onChange={(event) => handleCameraChange(event, camera.source_url)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select a camera' }}
                  >
                    <MenuItem value="" disabled>
                      Select a camera
                    </MenuItem>
                    {cameraData.map((camera) => (
                      <MenuItem key={camera.source_url} value={camera.source_url}>
                        {camera.source_url}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="video-container">
        {Object.entries(selectedCameras).map(([cameraId, selectedCameraId], index) => {
          const selectedCamera = cameraData.find((camera) => camera.source_url === selectedCameraId);
          return (
            <div key={index} className="video-player">
              {selectedCamera && selectedCamera.camera_hls_streaming_endpoint ? (
                <ReactVideoPlayer
                  key={selectedCamera.camera_id}
                  videoSource={selectedCamera.camera_hls_streaming_endpoint}
                />
              ) : (
                <div className="placeholder"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;

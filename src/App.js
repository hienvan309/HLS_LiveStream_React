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

        // Chuyển đổi dữ liệu từ API vào định dạng phù hợp cho selectedCameras
        const initialSelectedCameras = {};
        data.forEach((camera) => {
          initialSelectedCameras[camera.camera_id] = '';
        });

        setCameraData(data);
        setSelectedCameras(initialSelectedCameras);

        // Log ra mảng cameraData để kiểm tra
        console.log('cameraData:', data);
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
        {cameraData.map((camera) => (
          <div className="video-player" key={camera.camera_id}>
            <div className="dropdown-container">
              <select
                value={selectedCameras[camera.camera_id] || ''}
                onChange={(event) => handleCameraChange(event, camera.camera_id)}
              >
                <option value="" disabled>
                  Select a camera
                </option>
                {cameraData.map((cam) => (
                  <option key={cam.camera_id} value={cam.camera_hls_streaming_endpoint}>
                    {cam.source_url}
                  </option>
                ))}
              </select>
            </div>
            {selectedCameras[camera.camera_id] && (
              <ReactVideoPlayer
                key={selectedCameras[camera.camera_id]}
                videoSource={selectedCameras[camera.camera_id]}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [channelUrl, setChannelUrl] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVideos([]);
    setError('');

    try {
      const validateRes = await axios.post('http://localhost:5000/api/validate-channel', { url: channelUrl });
      const { channelId } = validateRes.data;

      const videosRes = await axios.post('http://localhost:5000/api/videos', { channelId });
      setVideos(videosRes.data.videos);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>YouTube Shorts Extractor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={channelUrl}
          onChange={(e) => setChannelUrl(e.target.value)}
          placeholder="Enter YouTube Channel URL"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Shorts'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="videos">
        {videos.map((video) => (
          <div key={video.videoId} className="video-card">
            <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noreferrer">
              <img src={video.thumbnailUrl} alt={video.title} />
              <h3>{video.title}</h3>
              <p>{Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')} minutes</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


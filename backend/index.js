require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.YOUTUBE_API_KEY;

// Helper to extract channel ID from URL
function extractChannelId(url) {
  if (url.includes('/channel/')) {
    return url.split('/channel/')[1].split(/[/?]/)[0];
  }
  if (url.includes('/user/')) {
    return url.split('/user/')[1].split(/[/?]/)[0];
  }
  return null;
}

// Validate channel
app.post('/api/validate-channel', async (req, res) => {
  try {
    const { url } = req.body;
    const channelId = extractChannelId(url);
    if (!channelId) return res.status(400).json({ error: 'Invalid URL format.' });

    const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
      params: {
        part: 'id,snippet',
        id: channelId,
        key: API_KEY
      }
    });

    if (response.data.items.length === 0) {
      return res.status(404).json({ error: 'Channel not found.' });
    }

    res.json({ channelId });
  } catch (error) {
    res.status(500).json({ error: 'Validation failed.' });
  }
});

// Fetch videos and filter
app.post('/api/videos', async (req, res) => {
  try {
    const { channelId } = req.body;
    let videos = [];
    let nextPageToken = '';

    do {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          key: API_KEY,
          channelId,
          part: 'id',
          order: 'date',
          maxResults: 50,
          pageToken: nextPageToken
        }
      });

      const videoIds = response.data.items
        .filter(item => item.id.kind === 'youtube#video')
        .map(item => item.id.videoId);

      if (videoIds.length === 0) break;

      const details = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          key: API_KEY,
          id: videoIds.join(','),
          part: 'snippet,contentDetails'
        }
      });

      const validVideos = details.data.items
        .map(video => {
          const duration = video.contentDetails.duration; // e.g. PT2M45S
          const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
          const minutes = parseInt(match?.[1] || 0);
          const seconds = parseInt(match?.[2] || 0);
          const totalSeconds = minutes * 60 + seconds;

          return {
            videoId: video.id,
            title: video.snippet.title,
            publishedAt: video.snippet.publishedAt,
            thumbnailUrl: video.snippet.thumbnails?.medium?.url,
            duration: totalSeconds
          };
        })
        .filter(video => video.duration <= 180); // under 3 minutes

      videos.push(...validVideos);
      nextPageToken = response.data.nextPageToken || '';
    } while (nextPageToken);

    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos.' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

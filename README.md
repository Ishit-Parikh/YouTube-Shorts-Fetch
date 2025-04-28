# YouTube Shorts Extractor

YouTube Shorts Extractor is a full-stack web application that allows users to extract and view YouTube Shorts videos from a given YouTube channel URL. The application consists of a React-based frontend and an Express.js backend.

## Features

- Validate YouTube channel URLs.
- Fetch and display YouTube Shorts videos (videos under 3 minutes).
- View video thumbnails, titles, and durations.
- Links to watch videos directly on YouTube.

## Project Structure

```
YouTube Shorts Extractor/
├── package.json
├── backend/
│   ├── index.js
│   ├── package.json
├── frontend/
│   ├── package.json
│   ├── README.md
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── robots.txt
│   ├── src/
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── reportWebVitals.js
│       ├── setupTests.js
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A valid YouTube Data API v3 key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/youtube-shorts-extractor.git
   cd youtube-shorts-extractor
   ```

2. Install dependencies for the backend:

   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:

   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the `backend` directory and add your YouTube Data API key:

   ```
   YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
   ```

## Usage

1. Start the application:

   ```bash
   npm run start
   ```

   This will start both the backend server (on `http://localhost:5000`) and the frontend (on `http://localhost:3000`).

2. Open your browser and navigate to `http://localhost:3000`.

3. Enter a YouTube channel URL and click "Fetch Shorts" to view the extracted YouTube Shorts videos.

## Scripts

### Root

- `npm run start`: Starts both the backend and frontend concurrently.

### Backend

- `npm install`: Installs backend dependencies.
- `node index.js`: Starts the backend server.

### Frontend

- `npm start`: Starts the React development server.
- `npm run build`: Builds the frontend for production.
- `npm test`: Runs tests for the frontend.

## Technologies Used

### Frontend

- React
- Axios
- CSS

### Backend

- Node.js
- Express.js
- Axios
- dotenv
- cors

## API Endpoints

### Backend

#### `POST /api/validate-channel`

- **Description**: Validates a YouTube channel URL and extracts the channel ID.
- **Request Body**:
  ```json
  {
    "url": "https://www.youtube.com/channel/CHANNEL_ID"
  }
  ```
- **Response**:
  ```json
  {
    "channelId": "CHANNEL_ID"
  }
  ```

#### `POST /api/videos`

- **Description**: Fetches YouTube Shorts videos (under 3 minutes) for a given channel ID.
- **Request Body**:
  ```json
  {
    "channelId": "CHANNEL_ID"
  }
  ```
- **Response**:
  ```json
  {
    "videos": [
      {
        "videoId": "VIDEO_ID",
        "title": "Video Title",
        "publishedAt": "2023-01-01T00:00:00Z",
        "thumbnailUrl": "https://example.com/thumbnail.jpg",
        "duration": 120
      }
    ]
  }
  ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [YouTube Data API v3](https://developers.google.com/youtube/v3)
- [Create React App](https://create-react-app.dev/)
- [Express.js](https://expressjs.com/)

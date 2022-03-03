# Juiced.io
Juiced.io is a fun party game to play with friends and families. Users can create/join rooms and battle to complete custom drawn exercise motion reps first! The app can be played online [**here.**](https://juicedio.netlify.app/)

## Demo
> **Devpost:** https://devpost.com/software/juiced-io<br/>
> **Video Demo:** https://www.youtube.com/watch?v=mT5ON4vxfyQ&ab_channel=AleckSun
<img src="client/src/images/Juicedio.gif" width="784" height="494"/>

## Inspiration
During Covid, it has been harder than ever to exercise. With gyms closing down and everyone having to socially distance, there has been little to no motivation to workout. Thus, we created Juiced.io to help people exercise in a fun and competitive way with their friends and family!

## How It Works
The room creator draws an exercise motion for users to perform reps on. The lobby then begins and users fight to be the first to complete ten reps. Our app uses OpenCV to track white objects that the user holds while performing the exercise. Our matching algorithm then determines if the tracked object is correctly following the drawn exercise motion and updates scores accordingly.<br/><br/>
**Technology:**<br/>
The frontend is built with OpenCV and React. The backend is built with Node.js and socket.io.

## Development
To run locally:
```bash
cd server
npm start
cd ../client
vim .env
```
Add `REACT_APP_URL=http://localhost:5000` to env file
```bash
npm start
```

import React, { useRef, useEffect, useState } from "react";
import { OpenCvProvider } from 'opencv-react';
import "../../styles.css";

let score = 0;
let stage = 0;
export default function Camera({ socket, users, room, user, exercise }) {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [currUsers, setCurrUsers] = useState(users);
    const [score, setScore] = useState(0);
    const [redlow, setRedlow] = useState(180);
    const [redhigh, setRedhigh] = useState(255);
    const [greenlow, setGreenlow] = useState(180);
    const [greenhigh, setGreenhigh] = useState(255);
    const [bluelow, setBluelow] = useState(180);
    const [bluehigh, setBluehigh] = useState(255);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    facingMode: "user",
                }
            })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    // OpenCV load
    const onLoaded = (cv) => {
        getVideo();
        const video = videoRef.current;
        video.addEventListener('play', () => {
            let cap = new cv.VideoCapture(video);
            let frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);

            const processVideo = () => {
                let points = exercise;

                console.log(redlow, redhigh, greenlow, greenhigh, bluelow, bluehigh);

                let begin = Date.now();
                cap.read(frame);
                // Process and filter
                let mask = new cv.Mat();
                let low = new cv.Mat(frame.rows, frame.cols, frame.type(), [redlow, greenlow, bluelow, 255]);
                let high = new cv.Mat(frame.rows, frame.cols, frame.type(), [redhigh, greenhigh, bluehigh, 255]);
                cv.inRange(frame, low, high, mask);

                let kernel = cv.Mat.ones(5, 5, cv.CV_8U);
                cv.morphologyEx(mask, mask, cv.MORPH_OPEN, kernel);

                // Object rectangle
                let boundingRect = cv.boundingRect(mask)
                let x = boundingRect.x;
                let y = boundingRect.y;
                let w = boundingRect.width;
                let h = boundingRect.height;
                
                // Scoring system
                let centerx = x + w / 2;
                let centery = y + h / 2;

                let currPoint = points[stage]
                let distance = Math.sqrt(Math.pow(currPoint.x - centerx, 2) + Math.pow(currPoint.y - centery, 2));
                // Check point is within exercise range
                if (distance < 50) {
                    // First point
                    if (stage == 0) {
                        stage = 1;
                    // Last point
                    } else if (stage == points.length - 1) {
                        stage = 0;
                        updateScore()
                        console.log(score);
                    } else {
                        stage += 1;
                    }
                }

                // Draw exercise path
                let color = [0, 0, 255, 255];
                for (let i = 0; i < points.length; i++) {
                    cv.circle(frame, new cv.Point(points[i].x, points[i].y), 10, color, -1, cv.LINE_8, 0);
                }
                color = [0, 255, 0, 255];
                cv.circle(frame, new cv.Point(points[stage].x, points[stage].y), 10, color, -1, cv.LINE_8, 0);

                let p1 = new cv.Point(0, 0);
                let p2 = new cv.Point(0, 0);
                if (x !== undefined && y !== undefined && w !== undefined && h !== undefined) {
                    p1 = new cv.Point(x, y);
                    p2 = new cv.Point(x + w, y + h);
                }
                cv.rectangle(frame, p1, p2, [0, 255, 0, 255], 2, cv.LINE_8, 0);

                cv.imshow('canvasOutput', frame);

                kernel.delete();
                mask.delete();
                low.delete();
                high.delete();

                let delay = 1000 / 24 - (Date.now() - begin);
                setTimeout(processVideo, delay);
            };
            processVideo();
        });
    };

    useEffect(() => {
        socket.on('scoreUpdate', ({users}) => {
            setCurrUsers(users);
        })
    }, []);

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    const updateScore = () => {
        setScore(score + 1);
        socket.emit('update', {code:room, user: user, score: score});
    };

    return (
        <div className="Camera">
            <div>Your score: {score}</div>
            <OpenCvProvider onLoad={ onLoaded }>
                <video ref={ videoRef } width="700" height="500" style={ { display: "none" } } />
                <canvas id="canvasOutput" ref={ photoRef } />
            </OpenCvProvider> 
            {currUsers.length > 0 ? currUsers.map((currUser) => {
                if (currUser.user == user) return;
                return <div>
                            {currUser.user}: {currUser.points}
                        </div>
            }) : null}
            {/* <div className="slidecontainer">
                <input type="range" min="1" max="255" value={redlow} onChange={(e) => setRedlow(e.target.value)} className="rl" />
                <input type="range" min="1" max="255" value={redhigh} onChange={(e) => setRedhigh(e.target.value)} className="rh" />
                <input type="range" min="1" max="255" value={greenlow} onChange={(e) => setGreenlow(e.target.value)} className="gl" />
                <input type="range" min="1" max="255" value={greenhigh} onChange={(e) => setGreenhigh(e.target.value)} className="gh" />
                <input type="range" min="1" max="255" value={bluelow} onChange={(e) => setBluelow(e.target.value)} className="bl" />
                <input type="range" min="1" max="255" value={bluehigh} onChange={(e) => setBluehigh(e.target.value)} className="bh" />
            </div>  */}
        </div>
    );
};
import React, { useRef, useEffect, useState } from "react";
import { OpenCvProvider } from 'opencv-react';
import "../../styles.css";

let stage = 0;
export default function Camera({ socket, users, room, user, exercise }) {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [currUsers, setCurrUsers] = useState(users);
    const [score, setScore] = useState(0);

    // Write camera stream to video element
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
                let begin = Date.now();
                cap.read(frame);
                // Process and filter
                let mask = new cv.Mat();
                let low = new cv.Mat(frame.rows, frame.cols, frame.type(), [210, 210, 210, 255]);
                let high = new cv.Mat(frame.rows, frame.cols, frame.type(), [255, 255, 255, 255]);
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
                if (distance < 75) {
                    // First point
                    if (stage == 0) {
                        stage = 1;
                    // Last point
                    } else if (stage == points.length - 1) {
                        stage = 0;
                        updateScore()
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

                // Draw frame to canvas
                try {
                    cv.imshow('canvasOutput', frame);
                } catch (err) {
                    console.log(err);
                }

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

    useEffect(() => {
        socket.emit('update', ({code:room, user: user, score: score}));
    }, [score])

    const updateScore = () => {
        setScore(prevScore => prevScore + 1);
    };

    return (
        <div className="Camera d-flex flex-column align-items-center justify-content-center">
            <h1>Your score: {score}</h1>
            <OpenCvProvider onLoad={ onLoaded }>
                <video ref={ videoRef } width="700" height="500" style={ { display: "none" } } />
                <canvas style={{transform: "scaleX(-1)"}} id="canvasOutput" ref={ photoRef } />
            </OpenCvProvider> 
            <div className="d-flex">
                {currUsers.length > 0 ? currUsers.map((currUser) => {
                    if (currUser.user == user) return;
                    return <h3 className="m-2">
                                {currUser.user}: {currUser.points}
                            </h3>
                }) : null}
            </div>
        </div>
    );
};
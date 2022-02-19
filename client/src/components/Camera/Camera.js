import React, { useRef, useEffect } from "react";
import { OpenCvProvider } from 'opencv-react';
import "../../styles.css";

export default function Camera() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

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
                cap.read(frame);
                // Process and filter
                let mask = new cv.Mat();
                let low = new cv.Mat(frame.rows, frame.cols, frame.type(), [180, 180, 180, 255]);
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

                let p1 = new cv.Point(0,0);
                let p2 = new cv.Point(0,0);

                if(x !== undefined && y !== undefined && w !== undefined && h !== undefined) {
                    p1 = new cv.Point(x, y);
                    p2 = new cv.Point(x + w, y + h);
                }

                cv.rectangle(frame, p1, p2, [0, 255, 0, 255], 2, cv.LINE_8, 0);
                cv.imshow('canvasOutput', frame);

                kernel.delete();
                mask.delete();
                low.delete();
                high.delete();
                setTimeout(processVideo, 50);
            };
            processVideo();
        });
    };

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    return (
        <div className="Camera">
            <OpenCvProvider onLoad={onLoaded}>
                <video ref={videoRef} width="700" height="500" style={{display: "none"}}></video>
                <canvas id="canvasOutput" ref={photoRef}></canvas>
            </OpenCvProvider>
        </div>
    );
};
import React, {
    useRef,
    useEffect
} from "react";
import {
    OpenCvProvider
} from 'opencv-react';
import "../../styles.css";

export default function Camera() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [redlow, setRedlow] = useState(0);
    const [redhigh, setRedhigh] = useState(0);
    const [greenlow, setGreenlow] = useState(0);
    const [greenhigh, setGreenhigh] = useState(255);
    const [bluelow, setBluelow] = useState(255);
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

                let far = false
                let stage = 0;
                let score = 0;

                let centerx = x + w / 2;
                let centery = y + h / 2;

                // check if the center is within 100 pixels of the first point
                if (stage == 0) {
                    let firstPoint = points[0];
                    let distance = Math.sqrt(Math.pow(firstPoint.x - centerx, 2) + Math.pow(
                        firstPoint.y - centery, 2));
                    if (distance < 50) {
                        stage = 1;
                        console.log('started')
                    }
                } else if (stage == points.length) {
                    let lastPoint = points[points.length - 1];
                    let distance = Math.sqrt(Math.pow(lastPoint.x - centerx, 2) + Math.pow(lastPoint.y - centery, 2));
                    if (distance < 50) {
                        stage = 0;
                        score ++;
                        console.log('finished', score)
                    }
                } else {
                    let currentPoint = points[stage];
                    let distance = Math.sqrt(Math.pow(currentPoint.x - centerx, 2) + Math.pow(
                        currentPoint.y - centery, 2));
                    if (distance < 50) {
                        stage++;
                    } else {
                        far = true; 
                    }
                }

                let p1 = new cv.Point(0, 0);
                let p2 = new cv.Point(0, 0);

                if (x !== undefined && y !== undefined && w !== undefined && h !== undefined) {
                    p1 = new cv.Point(x, y);
                    p2 = new cv.Point(x + w, y + h);
                }

                // draw the path
                for (let i = 0; i < points.length; i++) {
                    let point = points[i];
                    let color = [0, 0, 255, 255];

                    if (i == stage) {
                        color = [0, 255, 0, 255];
                    }

                    // first point color is green
                    if (i == 0) {
                        color = [0, 255, 0, 255];
                    }
                    // last point color is red
                    if (i == points.length - 1) {
                        color = [0, 0, 255, 255];
                    }


                    cv.circle(frame, new cv.Point(point.x, point.y), 10, color, -1, cv.LINE_8, 0);
                }
                cv.rectangle(frame, p1, p2, [0, 255, 0, 255], 2, cv.LINE_8, 0);

                cv.imshow('canvasOutput', frame);

                kernel.delete();
                mask.delete();
                low.delete();
                high.delete();

                let delay = 1000 / FPS - (Date.now() - begin);
                setTimeout(processVideo, delay);
            };
            processVideo();
        });
    };

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    return (
    <div className="Camera">
        <OpenCvProvider onLoad={ onLoaded }>
            <video ref={ videoRef } width="700" height="500" style={ { display: "none" } } />
            <canvas id="canvasOutput" ref={ photoRef } />
        </OpenCvProvider> 
        <div className="slidecontainer">
            <input type="range" min="1" max="255" value={redlow} onChange={(e) => setRedlow(e.target.value)} className="rl" />
            <input type="range" min="1" max="255" value={redhigh} onChange={(e) => setRedhigh(e.target.value)} className="rh" />
            <input type="range" min="1" max="255" value={greenlow} onChange={(e) => setGreenlow(e.target.value)} className="gl" />
            <input type="range" min="1" max="255" value={greenhigh} onChange={(e) => setGreenhigh(e.target.value)} className="gh" />
            <input type="range" min="1" max="255" value={bluelow} onChange={(e) => setBluelow(e.target.value)} className="bl" />
            <input type="range" min="1" max="255" value={bluehigh} onChange={(e) => setBluehigh(e.target.value)} className="bh" />
        </div> 
    </div>
    );
};
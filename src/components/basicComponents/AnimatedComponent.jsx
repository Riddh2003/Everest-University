import React from "react";
import '../../assets/styles/AnimatedButton.css'

const AnimatedComponent = () => {
    return (
        <div className="buttons">
            <button className="blob-btn">
                Blob Button
                <span className="blob-btn__inner">
                    <span className="blob-btn__blobs">
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                    </span>
                </span>
            </button>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                style={{ position: "absolute", width: 0, height: 0 }}
            >
                <defs>
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            result="blur"
                            stdDeviation="5"
                        ></feGaussianBlur>
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 15 -5"
                            result="goo"
                        ></feColorMatrix>
                        <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default AnimatedComponent;

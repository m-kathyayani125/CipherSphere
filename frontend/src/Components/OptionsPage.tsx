import React from "react";
import { Link, useParams } from "react-router-dom";
import ".././index.css";
import {
  FaFileAlt,
  FaImage,
  FaVideo,
  FaMusic,
  FaArrowLeft,
} from "react-icons/fa";
function OptionsPage() {
  const { action } = useParams();

  return (
    <div className="rootBox">
      <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }}
      >
        <defs>
          <linearGradient id="gradientFill" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="#39ffb1" />
            <stop offset="47%" stop-color="#3eb29a" />
            <stop offset="100%" stop-color="#005d4a" />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradientFill)"
          fill-opacity="1"
          d="M0,160L13.3,170.7C26.7,181,53,203,80,176C106.7,149,133,75,160,58.7C186.7,43,213,85,240,128C266.7,171,293,213,320,202.7C346.7,192,373,128,400,128C426.7,128,453,192,480,192C506.7,192,533,128,560,96C586.7,64,613,64,640,64C666.7,64,693,64,720,69.3C746.7,75,773,85,800,106.7C826.7,128,853,160,880,165.3C906.7,171,933,149,960,170.7C986.7,192,1013,256,1040,250.7C1066.7,245,1093,171,1120,149.3C1146.7,128,1173,160,1200,170.7C1226.7,181,1253,171,1280,154.7C1306.7,139,1333,117,1360,112C1386.7,107,1413,117,1427,122.7L1440,128L1440,0L1426.7,0C1413.3,0,1387,0,1360,0C1333.3,0,1307,0,1280,0C1253.3,0,1227,0,1200,0C1173.3,0,1147,0,1120,0C1093.3,0,1067,0,1040,0C1013.3,0,987,0,960,0C933.3,0,907,0,880,0C853.3,0,827,0,800,0C773.3,0,747,0,720,0C693.3,0,667,0,640,0C613.3,0,587,0,560,0C533.3,0,507,0,480,0C453.3,0,427,0,400,0C373.3,0,347,0,320,0C293.3,0,267,0,240,0C213.3,0,187,0,160,0C133.3,0,107,0,80,0C53.3,0,27,0,13,0L0,0Z"
        ></path>
      </svg>
      {/* <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{ filter: "drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.5))" }} // Increased shadow depth
      >
    
        <defs>
          <linearGradient id="gradientFill" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="#39ffb1" />
            <stop offset="47%" stop-color="#3eb29a" />
            <stop offset="100%" stop-color="#005d4a" />
          </linearGradient>
          <filter id="paintEffect" x="-10%" y="-10%" width="120%" height="120%">
            {" "}
            // Add filter for paint-like effect
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.1"
              numOctaves="5"
              result="noisy"
            />
            <feDisplacementMap in="SourceGraphic" in2="noisy" scale="20" />
          </filter>
        </defs>
        <path
          fill="url(#gradientFill)"
          fill-opacity="1"
          d="M0,160L13.3,170.7C26.7,181,53,203,80,176C106.7,149,133,75,160,58.7C186.7,43,213,85,240,128C266.7,171,293,213,320,202.7C346.7,192,373,128,400,128C426.7,128,453,192,480,192C506.7,192,533,128,560,96C586.7,64,613,64,640,64C666.7,64,693,64,720,69.3C746.7,75,773,85,800,106.7C826.7,128,853,160,880,165.3C906.7,171,933,149,960,170.7C986.7,192,1013,256,1040,250.7C1066.7,245,1093,171,1120,149.3C1146.7,128,1173,160,1200,170.7C1226.7,181,1253,171,1280,154.7C1306.7,139,1333,117,1360,112C1386.7,107,1413,117,1427,122.7L1440,128L1440,0L1426.7,0C1413.3,0,1387,0,1360,0C1333.3,0,1307,0,1280,0C1253.3,0,1227,0,1200,0C1173.3,0,1147,0,1120,0C1093.3,0,1067,0,1040,0C1013.3,0,987,0,960,0C933.3,0,907,0,880,0C853.3,0,827,0,800,0C773.3,0,747,0,720,0C693.3,0,667,0,640,0C613.3,0,587,0,560,0C533.3,0,507,0,480,0C453.3,0,427,0,400,0C373.3,0,347,0,320,0C293.3,0,267,0,240,0C213.3,0,187,0,160,0C133.3,0,107,0,80,0C53.3,0,27,0,13,0L0,0Z"
          style={{ filter: "url(#paintEffect)" }} // Apply paint-like effect filter
        ></path>
      </svg> */}

      <div className="App">
        <div className="glass-container2">
          <div className="content-col">
            <header className="App-header">
              <h1 className="title">CipherSphere</h1>
              <h2 className="subtitle">What you want to {action}?</h2>
              <p className="content-col">
                Whether it is text, images, videos, or audio, CipherSphere
                ensures your data remains private and protected.
              </p>
            </header>

            <div className="content-row">
              <span className="options">
                <Link to={`/process/${action}/text`}>
                  <button className="fileTypes">
                    <FaFileAlt className="icon" />
                    <>Text</>
                  </button>
                </Link>
                <Link to={`/process/${action}/image`}>
                  <button className="fileTypes">
                    <FaImage className="icon" /> Image
                  </button>
                </Link>
              </span>
              <span className="options">
                <Link to={`/process/${action}/video`}>
                  <button className="fileTypes">
                    <FaVideo className="icon" />
                    <>Video</>
                  </button>
                </Link>
                <Link to={`/process/${action}/audio`}>
                  <button className="fileTypes">
                    <FaMusic className="icon" />
                    <>Audio</>
                  </button>
                </Link>
              </span>
            </div>
          </div>
          <img className="image2" src="../Select.gif" alt="" />
        </div>
        <div className="back-button-container">
          <Link to="/">
            <FaArrowLeft />
          </Link>
        </div>
      </div>
    </div>
  );
}
export default OptionsPage;

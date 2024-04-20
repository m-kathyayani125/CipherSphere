import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import OptionsPage from "./Components/OptionsPage";

function App() {
  const [data, setData] = useState({
    message: "",
    status: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/");
        setData({
          message: res.data.message,
          status: res.data.status,
        });
        console.log("res", res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    console.log("data", data);
  }, []);
  return (
    <div className="rootBox">
      <div className="App">
        <div className="glass-container">
          <div className="content-col">
            <header className="App-header">
              <h1 className="title">CipherSphere</h1>
              <h4 className="subtitle">{data.message}</h4>
              <p>{data.status}</p>
            </header>

            <h2 className="option">Choose an option:</h2>
            <span className="options">
              <Link to="/options/encrypt">
                <button>Encrypt</button>
              </Link>
              <Link to="/options/decrypt">
                <button>Decrypt</button>
              </Link>
            </span>
          </div>

          <img className="image" src="pic.gif" alt="" />
        </div>
      </div>
      <footer>
        Made by:
        <p>M.Kathyayani(118), C.Jyoshna(062), Sk.Abdul Rasheed(309)</p>
        <p>CipherSphere © 2024</p>
      </footer>
      <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#005d4a"
          fill-opacity="1"
          d="M0,32L20,58.7C40,85,80,139,120,176C160,213,200,235,240,245.3C280,256,320,256,360,240C400,224,440,192,480,154.7C520,117,560,75,600,96C640,117,680,203,720,234.7C760,267,800,245,840,224C880,203,920,181,960,149.3C1000,117,1040,75,1080,64C1120,53,1160,75,1200,69.3C1240,64,1280,32,1320,53.3C1360,75,1400,149,1420,186.7L1440,224L1440,0L1420,0C1400,0,1360,0,1320,0C1280,0,1240,0,1200,0C1160,0,1120,0,1080,0C1040,0,1000,0,960,0C920,0,880,0,840,0C800,0,760,0,720,0C680,0,640,0,600,0C560,0,520,0,480,0C440,0,400,0,360,0C320,0,280,0,240,0C200,0,160,0,120,0C80,0,40,0,20,0L0,0Z"
        ></path>
      </svg>
      <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#3eb29a"
          fill-opacity="1"
          d="M0,160L13.3,170.7C26.7,181,53,203,80,176C106.7,149,133,75,160,58.7C186.7,43,213,85,240,128C266.7,171,293,213,320,202.7C346.7,192,373,128,400,128C426.7,128,453,192,480,192C506.7,192,533,128,560,96C586.7,64,613,64,640,64C666.7,64,693,64,720,69.3C746.7,75,773,85,800,106.7C826.7,128,853,160,880,165.3C906.7,171,933,149,960,170.7C986.7,192,1013,256,1040,250.7C1066.7,245,1093,171,1120,149.3C1146.7,128,1173,160,1200,170.7C1226.7,181,1253,171,1280,154.7C1306.7,139,1333,117,1360,112C1386.7,107,1413,117,1427,122.7L1440,128L1440,0L1426.7,0C1413.3,0,1387,0,1360,0C1333.3,0,1307,0,1280,0C1253.3,0,1227,0,1200,0C1173.3,0,1147,0,1120,0C1093.3,0,1067,0,1040,0C1013.3,0,987,0,960,0C933.3,0,907,0,880,0C853.3,0,827,0,800,0C773.3,0,747,0,720,0C693.3,0,667,0,640,0C613.3,0,587,0,560,0C533.3,0,507,0,480,0C453.3,0,427,0,400,0C373.3,0,347,0,320,0C293.3,0,267,0,240,0C213.3,0,187,0,160,0C133.3,0,107,0,80,0C53.3,0,27,0,13,0L0,0Z"
        ></path>
      </svg>

      <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#39ffb1"
          fill-opacity="1"
          d="M0,64L16,106.7C32,149,64,235,96,240C128,245,160,171,192,149.3C224,128,256,160,288,154.7C320,149,352,107,384,85.3C416,64,448,64,480,53.3C512,43,544,21,576,53.3C608,85,640,171,672,176C704,181,736,107,768,74.7C800,43,832,53,864,64C896,75,928,85,960,128C992,171,1024,245,1056,250.7C1088,256,1120,192,1152,149.3C1184,107,1216,85,1248,80C1280,75,1312,85,1344,128C1376,171,1408,245,1424,282.7L1440,320L1440,0L1424,0C1408,0,1376,0,1344,0C1312,0,1280,0,1248,0C1216,0,1184,0,1152,0C1120,0,1088,0,1056,0C1024,0,992,0,960,0C928,0,896,0,864,0C832,0,800,0,768,0C736,0,704,0,672,0C640,0,608,0,576,0C544,0,512,0,480,0C448,0,416,0,384,0C352,0,320,0,288,0C256,0,224,0,192,0C160,0,128,0,96,0C64,0,32,0,16,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
}

export default App;

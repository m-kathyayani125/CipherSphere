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
    <>
      <div className="App">
        <header className="App-header">
          <h1 className="title">CipherSphere</h1>

          <h4>{data.message}</h4>

          <p>{data.status}</p>
        </header>
        <div className="content">
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
      </div>
      <footer>
        {/* Footer Content */}
        Made by:
        <br />
        <p>M.Kathyayani(118), C.Jyoshna(062), Sk.Abdul Rasheed(309)</p>
        <br />
        <p>CipherSphere © 2024</p>
      </footer>
    </>
  );
}

export default App;

import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function TextPage() {
  const { action } = useParams();
  const [algo, setAlgo] = useState("");
  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:5000/process", {
        action,
        algo,
        type: "text",
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>{action}</h1>
      <h1>Text</h1>
      <button onClick={() => setAlgo("blowfish")}>blowfish</button>
      <button onClick={() => setAlgo("aes")}>aes</button>
      <button onClick={() => setAlgo("des")}>des</button>
      <button onClick={() => setAlgo("tripledes")}>tripledes</button>
      <h1>{algo}</h1>
      <button onClick={handleClick}>send</button>

      <Link to="/">back</Link>
    </div>
  );
}

export default TextPage;

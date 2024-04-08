import React from "react";
import { Link, useParams } from "react-router-dom";
// At the top of your component file (e.g., in OptionsPage.tsx, ImagePage.tsx)
import ".././index.css"; // Adjust the path based on your file structure

function OptionsPage() {
  const { action } = useParams();

  return (
    <div>
      <h1 className="title">What you want to {action}?</h1>
      <p className="content">
        Whether it is text, images, videos, or audio, CipherSphere ensures your
        data remains private and protected.
      </p>

      {/* <Link to={`/text/${action}/algo`}> */}
      <div className="content">
        <span className="options">
          <Link to={`/process/${action}/text`}>
            <button>text</button>
          </Link>
          <Link to={`/process/${action}/image`}>
            <button>image</button>
          </Link>
        </span>
        <span className="options">
          <Link to={`/process/${action}/video`}>
            <button>video</button>
          </Link>
          <Link to={`/process/${action}/audio`}>
            <button>audio</button>
          </Link>
        </span>
      </div>
      <Link to="/">back</Link>
    </div>
  );
}
export default OptionsPage;

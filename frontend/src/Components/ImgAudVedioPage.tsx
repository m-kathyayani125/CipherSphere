import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// At the top of your component file (e.g., in OptionsPage.tsx, ImagePage.tsx)
import ".././index.css"; // Adjust the path based on your file structure

function ImagePage() {
  const { action } = useParams();
  const { type } = useParams<string>();
  const [image, setImage] = useState<File | null>(null);
  const [TDESKey, setTDESKey] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [fileError, setFileError] = useState("");
  // const typeMap = {
  //   image: "jpg",
  //   vedio: "mp4",
  //   audio: "mp3",
  //   text: "txt",
  // };
  const typeMap = {
    image: ["jpg", "jpeg", "png", "gif", "bmp", "svg"],
    video: ["mp4", "avi", "mov", "wmv", "flv"],
    audio: ["mp3", "wav", "aac", "flac", "ogg"],
    text: ["txt", "doc", "docx", "pdf", "odt"],
  };

  const [processedImage, setProcessedImage] = useState(null);
  const [processSuccess, setProcessSuccess] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(!image || TDESKey.trim() === "");
  }, [image, TDESKey]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.name.split(".").pop()?.toLowerCase(); // Get file extension and convert to lowercase
      const expectedTypes = typeMap[type as keyof typeof typeMap];

      if (!fileType || !expectedTypes.includes(fileType)) {
        setFileError(
          `The uploaded file does not match the expected format(s).Please upload a file in one of the following formats:${
            type && typeMap[type as keyof typeof typeMap].join(", ")
          }.Ensure your file extension is correct and try again.`
        );
        setImage(null); // Clear the selected file if the type is incorrect
      } else {
        setFileError(""); // Clear any existing error messages
        setImage(file);
      }
    }
  };
  const handleTDESKey = (e: any) => {
    setTDESKey(e.target.value);
  };
  const handleClick = async () => {
    console.log("clicked");
    setProcessSuccess(false);
    try {
      const formData = new FormData();
      if (image) formData.append("file", image);
      formData.append("TDESKey", TDESKey);
      const response = await axios.post(
        "http://localhost:5000/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            action,
            algo: "",
            type: "image",
          },
          responseType: "blob",
        }
      );
      if (response.status === 200) {
        setProcessedImage(response.data);
        setProcessSuccess(true); // Indicate success
      } else {
        throw new Error("Failed to process the file");
      }
      //   console.log(response);
    } catch (error) {
      console.error(error);
      setProcessSuccess(false);
    }
  };
  const handleDownload = (action: string) => {
    if (!processedImage) return;
    const url = window.URL.createObjectURL(new Blob([processedImage]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      action == "encrypt"
        ? `encrypted_file.${typeMap[type as keyof typeof typeMap][0]}`
        : `decrypted_file.${typeMap[type as keyof typeof typeMap][0]}`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  console.log(isButtonDisabled);
  return (
    <div>
      <h2>
        You are <span className="highlight">{action}ing</span> a file of type:{" "}
        <span className="highlight">{type}</span>.
      </h2>

      {/* <input onChange={handleTDESKey}></input>
       */}
      <label htmlFor="tdesKey">TDES Key:</label>
      <input
        id="tdesKey"
        placeholder="Enter your TDES Key here"
        onChange={handleTDESKey}
      ></input>
      <input type="file" onChange={handleFileUpload}></input>

      <p className="format-note">
        Please upload a file in{" "}
        {type && typeMap[type as keyof typeof typeMap].join(", ")} format.
      </p>
      {fileError && (
        <div className="alert">
          <h1>⚠️</h1>
          <h5>{fileError}</h5>
        </div>
      )}
      {processSuccess && (
        <div className="success-message">
          ✅{" "}
          {`${
            action!.charAt(0).toUpperCase() + action!.slice(1)
          }ion successful!`}
        </div>
      )}

      <span className="space-between">
        <>
          <button onClick={handleClick} disabled={isButtonDisabled}>
            {action}
          </button>

          {processedImage && (
            <button
              onClick={() => {
                handleDownload(action!);
              }}
            >
              Download File
            </button>
          )}
        </>
        <Link to="/">Back</Link>
      </span>
    </div>
  );
}
export default ImagePage;

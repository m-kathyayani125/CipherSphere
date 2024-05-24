import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// At the top of your component file (e.g., in OptionsPage.tsx, ImagePage.tsx)
import ".././index.css";
import { FaArrowLeft, FaKey } from "react-icons/fa";

function ImagePage() {
  const { action } = useParams();
  const { type } = useParams<string>();
  const [image, setImage] = useState<File | null>(null);
  const [TDESKey, setTDESKey] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [fileError, setFileError] = useState("");
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
    <div className="rootBox">
      {/* FC2D92-pink 00E6B3-green 142664-black */}
      {/* dark-005d4a,medium-3eb29a,light-39ffb1 */}
      {/* <stop offset="0%" stop-color="#74febd" />
            <stop offset="100%" stop-color="#0172af" /> */}
      <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#39ffb1" />
            <stop offset="47%" stop-color="#3eb29a" />
            <stop offset="80%" stop-color="#005d4a" />
            {/* <stop offset="0%" stop-color="#74febd" />
            <stop offset="100%" stop-color="#005d4a" /> */}
          </linearGradient>
        </defs>
        <path
          fill="url(#grad1)"
          fill-opacity="0.6"
          d="M0,32L110.8,32L221.5,288L332.3,128L443.1,32L553.8,64L664.6,256L775.4,0L886.2,256L996.9,224L1107.7,64L1218.5,224L1329.2,32L1440,64L1440,0L1329.2,0L1218.5,0L1107.7,0L996.9,0L886.2,0L775.4,0L664.6,0L553.8,0L443.1,0L332.3,0L221.5,0L110.8,0L0,0Z"
        ></path>
      </svg>
      <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#39ffb1" />
            <stop offset="47%" stop-color="#3eb29a" />
            <stop offset="100%" stop-color="#005d4a" />

            {/* <stop offset="0%" stop-color="#74febd" />
            <stop offset="100%" stop-color="#005d4a" /> */}
          </linearGradient>
        </defs>
        <path
          fill="url(#grad2)"
          fill-opacity="0.5"
          d="M0,0L84.7,160L169.4,128L254.1,160L338.8,128L423.5,128L508.2,256L592.9,128L677.6,96L762.4,32L847.1,160L931.8,288L1016.5,96L1101.2,288L1185.9,32L1270.6,96L1355.3,224L1440,64L1440,0L1355.3,0L1270.6,0L1185.9,0L1101.2,0L1016.5,0L931.8,0L847.1,0L762.4,0L677.6,0L592.9,0L508.2,0L423.5,0L338.8,0L254.1,0L169.4,0L84.7,0L0,0Z"
        ></path>
      </svg>
      <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#39ffb1" />
            <stop offset="47%" stop-color="#3eb29a" />
            <stop offset="80%" stop-color="#005d4a" />
            {/* <stop offset="0%" stop-color="#74febd" />
            <stop offset="100%" stop-color="#005d4a" /> */}
          </linearGradient>
        </defs>
        <path
          fill="url(#grad3)"
          fill-opacity="0.4"
          d="M0,128L80,64L160,288L240,128L320,192L400,64L480,128L560,64L640,192L720,128L800,128L880,96L960,96L1040,192L1120,96L1200,224L1280,224L1360,224L1440,288L1440,0L1360,0L1280,0L1200,0L1120,0L1040,0L960,0L880,0L800,0L720,0L640,0L560,0L480,0L400,0L320,0L240,0L160,0L80,0L0,0Z"
        ></path>
      </svg>

      {/* <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,32L18.5,32C36.9,32,74,32,111,74.7C147.7,117,185,203,222,218.7C258.5,235,295,181,332,138.7C369.2,96,406,64,443,53.3C480,43,517,53,554,90.7C590.8,128,628,192,665,181.3C701.5,171,738,85,775,85.3C812.3,85,849,171,886,208C923.1,245,960,235,997,202.7C1033.8,171,1071,117,1108,117.3C1144.6,117,1182,171,1218,165.3C1255.4,160,1292,96,1329,69.3C1366.2,43,1403,53,1422,58.7L1440,64L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"
        ></path>
      </svg>
      <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#0099ff"
          fill-opacity="0.8"
          d="M0,64L24,106.7C48,149,96,235,144,256C192,277,240,235,288,186.7C336,139,384,85,432,90.7C480,96,528,160,576,197.3C624,235,672,245,720,224C768,203,816,149,864,133.3C912,117,960,139,1008,165.3C1056,192,1104,224,1152,224C1200,224,1248,192,1296,192C1344,192,1392,224,1416,240L1440,256L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
        ></path>
      </svg>
      <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#0099ff"
          fill-opacity="0.6"
          d="M0,320L24,314.7C48,309,96,299,144,266.7C192,235,240,181,288,181.3C336,181,384,235,432,250.7C480,267,528,245,576,202.7C624,160,672,96,720,96C768,96,816,160,864,192C912,224,960,224,1008,208C1056,192,1104,160,1152,133.3C1200,107,1248,85,1296,106.7C1344,128,1392,192,1416,224L1440,256L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
        ></path>
      </svg> */}
      {/* <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#FC2D92"
          fillOpacity="1"
          d="M0,128L11.4,117.3C22.9,107,46,85,69,90.7C91.4,96,114,128,137,122.7C160,117,183,75,206,96C228.6,117,251,203,274,213.3C297.1,224,320,160,343,122.7C365.7,85,389,75,411,96C434.3,117,457,171,480,197.3C502.9,224,526,224,549,208C571.4,192,594,160,617,165.3C640,171,663,213,686,208C708.6,203,731,149,754,144C777.1,139,800,181,823,218.7C845.7,256,869,288,891,293.3C914.3,299,937,277,960,277.3C982.9,277,1006,299,1029,261.3C1051.4,224,1074,128,1097,117.3C1120,107,1143,181,1166,208C1188.6,235,1211,213,1234,181.3C1257.1,149,1280,107,1303,96C1325.7,85,1349,107,1371,112C1394.3,117,1417,107,1429,101.3L1440,96L1440,0L1428.6,0C1417.1,0,1394,0,1371,0C1348.6,0,1326,0,1303,0C1280,0,1257,0,1234,0C1211.4,0,1189,0,1166,0C1142.9,0,1120,0,1097,0C1074.3,0,1051,0,1029,0C1005.7,0,983,0,960,0C937.1,0,914,0,891,0C868.6,0,846,0,823,0C800,0,777,0,754,0C731.4,0,709,0,686,0C662.9,0,640,0,617,0C594.3,0,571,0,549,0C525.7,0,503,0,480,0C457.1,0,434,0,411,0C388.6,0,366,0,343,0C320,0,297,0,274,0C251.4,0,229,0,206,0C182.9,0,160,0,137,0C114.3,0,91,0,69,0C45.7,0,23,0,11,0L0,0Z"
        ></path>
      </svg>
      <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#00E6B3"
          fillOpacity="1"
          d="M0,32L20,48C40,64,80,96,120,128C160,160,200,192,240,181.3C280,171,320,117,360,96C400,75,440,85,480,96C520,107,560,117,600,122.7C640,128,680,128,720,112C760,96,800,64,840,74.7C880,85,920,139,960,186.7C1000,235,1040,277,1080,261.3C1120,245,1160,171,1200,149.3C1240,128,1280,160,1320,170.7C1360,181,1400,171,1420,165.3L1440,160L1440,0L1420,0C1400,0,1360,0,1320,0C1280,0,1240,0,1200,0C1160,0,1120,0,1080,0C1040,0,1000,0,960,0C920,0,880,0,840,0C800,0,760,0,720,0C680,0,640,0,600,0C560,0,520,0,480,0C440,0,400,0,360,0C320,0,280,0,240,0C200,0,160,0,120,0C80,0,40,0,20,0L0,0Z"
        ></path>
      </svg>
      <svg
        className="svg-overlay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#142664"
          fillOpacity="1"
          d="M0,32L11.4,58.7C22.9,85,46,139,69,160C91.4,181,114,171,137,186.7C160,203,183,245,206,266.7C228.6,288,251,288,274,261.3C297.1,235,320,181,343,154.7C365.7,128,389,128,411,160C434.3,192,457,256,480,245.3C502.9,235,526,149,549,144C571.4,139,594,213,617,218.7C640,224,663,160,686,122.7C708.6,85,731,75,754,90.7C777.1,107,800,149,823,176C845.7,203,869,213,891,208C914.3,203,937,181,960,170.7C982.9,160,1006,160,1029,160C1051.4,160,1074,160,1097,160C1120,160,1143,160,1166,160C1188.6,160,1211,160,1234,149.3C1257.1,139,1280,117,1303,144C1325.7,171,1349,245,1371,266.7C1394.3,288,1417,256,1429,240L1440,224L1440,0L1428.6,0C1417.1,0,1394,0,1371,0C1348.6,0,1326,0,1303,0C1280,0,1257,0,1234,0C1211.4,0,1189,0,1166,0C1142.9,0,1120,0,1097,0C1074.3,0,1051,0,1029,0C1005.7,0,983,0,960,0C937.1,0,914,0,891,0C868.6,0,846,0,823,0C800,0,777,0,754,0C731.4,0,709,0,686,0C662.9,0,640,0,617,0C594.3,0,571,0,549,0C525.7,0,503,0,480,0C457.1,0,434,0,411,0C388.6,0,366,0,343,0C320,0,297,0,274,0C251.4,0,229,0,206,0C182.9,0,160,0,137,0C114.3,0,91,0,69,0C45.7,0,23,0,11,0L0,0Z"
        ></path>
      </svg> */}

      <div className="App">
        <div className="glass-container2">
          <div className="content-col">
            <header className="App-header">
              <h2>
                You are <span className="highlight">{action}ing</span> a file of
                type: <span className="highlight">{type}</span>.
              </h2>
            </header>
            {/* <label htmlFor="tdesKey">TDES Key:</label>
            <input
              id="tdesKey"
              placeholder="Enter your TDES Key here"
              onChange={handleTDESKey}
            ></input> */}
            <div className="input-container">
              <label htmlFor="tdesKey">TDES Key:</label>
              <div className="input-field-container">
                <FaKey className="icons" />
                <input
                  id="tdesKey"
                  type="text"
                  placeholder="Enter your TDES Key here"
                  onChange={handleTDESKey}
                  className="input-field"
                />
              </div>
            </div>
            {/* <input type="file" onChange={handleFileUpload}></input> */}
            <div className="input-container">
              <label
                htmlFor="file"
                className="file-upload-label" /*"custom-file-upload"*/
              >
                Upload file to {action}:
              </label>
              <input
                id="file"
                type="file"
                onChange={handleFileUpload}
                className="input-field"
              />
            </div>

            {/* <p className="format-note">
              Please upload a file in{" "}
              {type && typeMap[type as keyof typeof typeMap].join(", ")} format.
            </p>
            {fileError && (
              <div className="alert">
                <h1>⚠️</h1>
                <h5>{fileError}</h5>
              </div>
            )} */}

            <p className="format-note">
              Please upload a file in{" "}
              {type && typeMap[type as keyof typeof typeMap].join(", ")} format.
            </p>
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
            </span>
          </div>
          {fileError ? (
            <div className="alert">
              <img src="../../notify.svg" alt="" className="alert-image" />
              <h5>{fileError}</h5>
            </div>
          ) : (
            <img className="image3" src="../../Image upload.gif" alt="" />
          )}
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
export default ImagePage;

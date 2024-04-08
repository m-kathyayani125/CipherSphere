import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OptionsPage from "./Components/OptionsPage.tsx";

import ImagePage from "./Components/ImgAudVedioPage.tsx";
import TextPage from "./Components/TextPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/options/:action" element={<OptionsPage />} />
        <Route path="/text/:action/:algo" element={<TextPage />} />
        <Route path="/process/:action/:type" element={<ImagePage />} />
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>
);

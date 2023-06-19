import React, { createContext, useState } from "react";
import axios from "axios";

const AudioContext = createContext(null);

export { AudioContext };

const AudioProvider = ({ children }) => {
  const [audioBlobs, setAudioBlobs] = useState([]);

  const uploadAudioFile = (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "recorded_audio.wav");

    axios
      .post("http://localhost:30000/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response?.data?.text) {
          let output = {
            result: response.data.text,
            success : true,
            audioBlob,
          };
          setAudioBlobs((prev) => {
            return [...prev, output];
          });
        } else {
          let output = {
            result: "Something Went wrong",
            audioBlob,
            success : false,
          };
          setAudioBlobs((prev) => {
            return [...prev, output];
          });
        }
        console.log("File uploaded successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  let value = {
    audioBlobs,
    setAudioBlobs,
    uploadAudioFile,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioProvider;

import React, { useContext, useState } from "react";
import { AudioRecorder } from 'react-audio-voice-recorder';

import axios from 'axios';
import AudioList from "./AudioList";
import { AudioContext } from "../context/AudioContext";


export default function RecordAudio() {


    const state = useContext(AudioContext)



    const uploadAudioFile = (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recorded_audio.wav');

    axios
        .post('http://localhost:30000/transcribe', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        })
        .then((response) => {
        console.log('File uploaded successfully:', response.data);
        // Handle the response from the server
        })
        .catch((error) => {
        console.error('Error uploading file:', error);
        // Handle the error
        });
    };



    const addAudioElement = (blob) => {

        state.setAudioBlobs((prev)=>{
            return [...prev,blob]
        })

        uploadAudioFile(blob)


      };


  return (
    <>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        showVisualizer={true}
      />

      
    </>
  );
}

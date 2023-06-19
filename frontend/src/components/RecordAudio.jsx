import React, { useContext } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

import { AudioContext } from "../context/AudioContext";

export default function RecordAudio() {
  const state = useContext(AudioContext);

  return (
    <>
      <AudioRecorder
        onRecordingComplete={state.uploadAudioFile}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        showVisualizer={true}
      />
    </>
  );
}

import { Button, Upload, message } from "antd";
import React, {useContext} from "react";
import { UploadOutlined } from "@ant-design/icons";
import { AudioContext } from "../context/AudioContext";



export default function RecordAudio() {
  const state = useContext(AudioContext);
  const props = {
    name: 'file',
    // action: 'http://localhost:30000/transcribe',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    showUploadList: false,
    beforeUpload: (file) => {
      console.log("Upload file", file)
      const isAudio = file.type === "audio/mpeg" || file.type === "audio/flac";
      if (!isAudio) {
        message.error(`${file.name} is not a audio file`);
      }
      // return isAudio || Upload.LIST_IGNORE;
      return false
    },
    onChange: (info) => {
      // if (info.status === "done") {
        console.log("Result",info.file);
        state.uploadAudioFile(info.file);

      // }


    },
  };
  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Upload Audio File</Button>
      </Upload>
    </>
  );
}

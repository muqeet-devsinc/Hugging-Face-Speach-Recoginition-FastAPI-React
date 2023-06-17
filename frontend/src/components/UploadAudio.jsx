import { Button, Upload, message } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";

export default function RecordAudio() {
  const props = {
    name: 'file',
    action: 'http://localhost:30000/transcribe',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    beforeUpload: (file) => {
      console.log("Upload file", file)
      const isAudio = file.type === "audio/mpeg" || file.type === "audio/flac";
      if (!isAudio) {
        message.error(`${file.name} is not a audio file`);
      }
      return isAudio || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log("Result",info.file);
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

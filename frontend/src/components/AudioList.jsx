import React, { useContext } from 'react';
import { List, Typography } from 'antd';
import {AudioContext} from '../context/AudioContext'
const AudioList = () => {

  const state = useContext(AudioContext)

  const renderItem = (item) => {
    const url = URL.createObjectURL(item.audioBlob);
    return (
      <List.Item>
        <audio src={url} controls />
        <Typography.Text>{item.result}</Typography.Text>
      </List.Item>
    );
  };

  return <List dataSource={state.audioBlobs} renderItem={renderItem} />;
};

export default AudioList;
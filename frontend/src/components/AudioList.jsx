import React, { useContext } from 'react';
import { List } from 'antd';
import {AudioContext} from '../context/AudioContext'
const AudioList = () => {

  const state = useContext(AudioContext)

  const renderItem = (audioBlob) => {
    const url = URL.createObjectURL(audioBlob);
    return (
      <List.Item>
        <audio src={url} controls />
      </List.Item>
    );
  };

  return <List dataSource={state.audioBlobs} renderItem={renderItem} />;
};

export default AudioList;
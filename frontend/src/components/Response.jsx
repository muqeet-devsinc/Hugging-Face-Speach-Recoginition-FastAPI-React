import { Typography } from 'antd'
import React from 'react'
import AudioList from './AudioList'

function Response(props) {
  return (
    <>
    <Typography.Title level={2}>Result</Typography.Title>

    <Typography.Text>
    {props.text}
    </Typography.Text>

    <AudioList audioList={props.audioBlobs}/>
    </>
  )
}

export default Response
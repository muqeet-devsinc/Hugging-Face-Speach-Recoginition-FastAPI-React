import React, { createContext, useState } from "react";


const AudioContext = createContext(null);

export {AudioContext};

const AudioProvider  = ({children}) => {

    const [audioBlobs, setAudioBlobs] = useState([])
    // const doSomething = () =>{

    // }

    let value = {
        audioBlobs,
        setAudioBlobs
    }

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    )
}

export default AudioProvider

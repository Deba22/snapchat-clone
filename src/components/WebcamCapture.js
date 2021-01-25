import React, { useRef, useCallback, useState } from 'react';
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { setCameraImage } from '../features/cameraSlice';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './WebcamCapture.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
};

function WebcamCapture() {

    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history=useHistory();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
      history.push('/preview');
    }, [webcamRef])

    const closeCapture = () => {
        console.log("testtt");
        history.replace('/');
    }
    return (
        <div className="webcamCapture">
            <ArrowBackIcon className="webcamCapture__backIcon" onClick={closeCapture}/>
            <Webcam audio={false} height={videoConstraints.height} ref={webcamRef}
                screenshotFormat="image/jpeg" width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />
            <RadioButtonUncheckedIcon className="webcamCapture__button" onClick={capture}
                fontSize="large"
            />

        </div>
    )
}

export default WebcamCapture

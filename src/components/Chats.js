import React, { useEffect, useState } from 'react';
import './Chats.css';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Avatar } from '@material-ui/core';
import { auth, db } from '../firebase';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/appSlice';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from '../features/cameraSlice';

function Chats() {
    const user = useSelector(selectUser);
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    
const logoutOfApp=()=>{
    dispatch(logout());
    auth.signOut();
    };
    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        })
    }, [])

    const takeSnap = () => {
        dispatch(resetCameraImage());
        history.push("/capture");
    }
    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar className="chats__avatar" src={user.profilePic} onClick={logoutOfApp} />
                <div className="chats__search">
                    <SearchIcon className="chats__searchIcon"/>
                    <input placeholder="Friends" type="text" />
                </div>
                <ChatBubbleIcon className="chats__chatIcon" />

            </div>
            <div className="chats__posts">
                {posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read }, }) => (
                    <Chat key={id} id={id} username={username} timestamp={timestamp} imageUrl={imageUrl} read={read} profilePic={profilePic} />
                )
                )}
            </div>
            <RadioButtonUncheckedIcon className="chats__takePicIcon" onClick={takeSnap} fontSize="large" />
        </div>
    )
}

export default Chats

import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MicOutlined, SearchOutlined } from '@material-ui/icons'
import MoreVert from '@material-ui/icons/MoreVert'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore/lite'
import { doc, setDoc } from 'firebase/firestore/lite'
import { Timestamp } from 'firebase/firestore'
import db from './Firebase.js'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import React from 'react'
import './Chat.css'
import axios from "./axios.js"
import { useStateValue } from './StateProvider.js'

function Chat({messages}) {
    const [input, setInput] = useState('')
    const [seed,setSeed] = useState("")
    const { roomId } = useParams();
    const [RoomName, setRoomName] = useState("")
    const [msgs, setMsgs] = useState([])
    const [{ user }, dispatch] = useStateValue()


    async function setRoom(roomId) {
        const q = query(collection(db, 'Whatsapp-Messages'), where('__name__', '==', roomId))
        const querySnapshot = await getDocs(q);
        return querySnapshot
    }

    async function setmessages(doc) {
        const q = query(collection(db, `Whatsapp-Messages/${doc.id}/messages`), orderBy("timestamp", "asc"))
        const querySnapshot = await getDocs(q);
        return querySnapshot
    }

    async function addmessages() {
        await setDoc(doc(db, `Whatsapp-Messages/${roomId}/messages`,"newMessage".concat(Math.random().toString())), {
            message: input,
            name: user.displayName,
            timestamp: Timestamp.now().toDate()
        })
    }


    useEffect(() => {
        if (roomId) {
            setRoom(roomId).then((QS) => {
                QS.forEach((doc) => {
                    setRoomName(doc.data().name)
                    setmessages(doc).then(snapShot => 
                        setMsgs(snapShot.docs.map(document => 
                            document.data()))
                        )
                })
            }).catch((err) => console.log(err))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault()
        //axios.post('/api/v1/messages/new',{
            //message : input,
            //name : "Sonny Sanghaa",
            //timestamp : "13:26",
            //received : true
    //})
        addmessages()
    setInput("")
    }
    
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{RoomName}</h3>
                    <p>Last Seen at ...</p>
                </div>
                    <div className="chat__headerRight">
                        <IconButton>
                            <SearchOutlined />
                        </IconButton>
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                    </div>
                </div>
                <div className="chat__body">
                    {msgs.map(message=>{
                        return (
                        <p className={`chat__message ${//message.received 
                            message.name === user.displayName && "chat__receiver"}`}>
                            <span className = "chat__name">{message.name}</span>
                                {message.message}
                            <span className="chat__timestamp">
                                {message.timestamp.toDate().toString()}
                            </span>
                        </p>
                        )
                    })}
                </div>
                <div class="chat__footer">
                    <InsertEmoticonIcon />
                    <form>
                        <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
                        <button onClick={sendMessage} type="submit">Send a message</button>
                    </form>
                    <MicOutlined />
                </div>
            </div>
    )
}

export default Chat

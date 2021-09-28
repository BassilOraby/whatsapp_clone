import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MicOutlined, SearchOutlined } from '@material-ui/icons'
import MoreVert from '@material-ui/icons/MoreVert'
import { useState, useEffect } from 'react'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import React from 'react'
import './Chat.css'
import axios from "./axios.js"

function Chat({messages}) {
    const [input, setInput] = useState('')
    const [seed,setSeed] = useState("")

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        axios.post('/api/v1/messages/new',{
            message : input,
            name : "Sonny Sanghaa",
            timestamp : "13:26",
            received : true
    })
    setInput("")
    }
    
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
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
                    {messages.map(message=>{
                        return (
                        <p className={`chat__message ${message.received && "chat__receiver"}`}>
                            <span className = "chat__name">{message.name}</span>
                                {message.message}
                            <span className="chat__timestamp">
                                {message.timestamp}
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

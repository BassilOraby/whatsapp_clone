import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MicOutlined, SearchOutlined } from '@material-ui/icons'
import MoreVert from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import React from 'react'
import './Chat.css'

function Chat() {
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
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
                    <p className="chat__message">
                        <span className = "chat__name">Brad</span>
                        This is a message
                        <span className="chat__timestamp">
                            {new Date().toUTCString()}
                        </span>
                    </p>

                    <p className="chat__message chat__receiver">
                        <span className = "chat__name">Brad</span>
                        This is a message
                        <span className="chat__timestamp">
                            {new Date().toUTCString()}
                        </span>
                    </p>
                </div>
                <div class="chat__footer">
                    <InsertEmoticonIcon />
                    <form>
                        <input type="text" placeholder="Type a message" />
                        <button type="submit">Send a message</button>
                    </form>
                    <MicOutlined />
                </div>
            </div>
    )
}

export default Chat

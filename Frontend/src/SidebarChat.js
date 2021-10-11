import React, { useState, useEffect } from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {collection, onSnapshot, query, orderBy, getDocs} from 'firebase/firestore'
import db from './Firebase.js'


function SidebarChat({id, name, addNewChat, createChat}) {
    const [seed,setSeed] = useState("")
    const [messages, setMessages] = useState([])

    async function getChats() {
        console.log(id)
        const q = query(collection(db, `Whatsapp-Messages/${id}/messages`), orderBy("timestamp", "desc"))
        onSnapshot(q, (querySnapshot) => setMessages(querySnapshot.docs.map((doc) => 
        doc.data())))
    }

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000))
    }, [])

    useEffect(() => {
        if (id) {
            getChats()
        }
    }, [id])

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat

import React, {useEffect, useState} from 'react'
import db from '../src/Firebase.js'
import './Sidebar.css'
import {collection, getDocs, addDoc} from 'firebase/firestore'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IconButton, Avatar } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import { useStateValue } from './StateProvider.js'

function Sidebar() {
    const [rooms, setRooms] = useState([])
    const [Flag, setFlag] = useState(false)
    const [{ user }, dispatch] = useStateValue()

    async function getChats() {
        const chatsCol = collection(db, 'Whatsapp-Messages')
        const chatsSnapshot = await getDocs(chatsCol)
        const chatsList = chatsSnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        })
        )
        return chatsList
    }

    async function createChat () {
        const roomName = prompt("Please enter name for chat")

        if (roomName) {
            await addDoc(collection(db, "Whatsapp-Messages"), {
                name: roomName
              });
            setFlag(!Flag)
        }
    };

    
    useEffect(() => {
        getChats().then(List => setRooms(List)).catch(err => console.log(err))
    }, [Flag])

    return (
        <div className="sideBar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text"/>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat={true} createChat={() => createChat()} />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar

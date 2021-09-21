import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IconButton, Avatar } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div className="sideBar">
            <div className="sidebar__header">
                <Avatar src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Brad_Pitt_2019_by_Glenn_Francis.jpg/1200px-Brad_Pitt_2019_by_Glenn_Francis.jpg'/>
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
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar

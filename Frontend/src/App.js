import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import React, {useEffect, useState} from 'react';
import Pusher from 'pusher-js';
import axios from './axios.js';

function App() {
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    axios.get('/messages/sync').then(response => {
        setMessages(response.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('c63f18dc3e0fe48a8591', {
      cluster: 'eu'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage])
    });
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])

  console.log(messages)

  return (
    <div className="App">
      <div className="app__body">
      <Sidebar />
      <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;

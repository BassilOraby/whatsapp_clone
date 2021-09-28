import express from "express"
import mongoose from "mongoose"
import Cors from "cors"
import Pusher from "pusher";
import Messages from './dbMessages.js'

const app = express();
const port = process.env.PORT || 9000
const db = mongoose.connection
const connection_url = 'mongodb+srv://BassilOraby:vFF74EhiyJ&r%23%2F4@cluster0.j9atw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

db.once('open',()=>{
    console.log("DB connected")
    // Here is where we create changeStream for Mongodb to keep track of changes in a certain collection
    const msgCollection = db.collection("messagecontents") 
    const changeStream = msgCollection.watch()
    // Here is where we use MongoDB's changeStream to aggregate it with pusher
    changeStream.on('change', (change) => {
        console.log("Change Occured", change)
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument
            pusher.trigger('messages', 'inserted',
            {
                name : messageDetails.name,
                message : messageDetails.message,
                timestamp : messageDetails.timestamp,
                received : messageDetails.received
            }
        )
        } else {
            console.log('Error triggering pusher')
        }
    })
})

app.use(Cors())

app.use(express.json())

app.use((req,res,next)=>{
    res.setHeader("Access-Comtrol-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    next()
})

const pusher = new Pusher({
    appId: "1271541",
    key: "c63f18dc3e0fe48a8591",
    secret: "c0b247f68b7d3ef5e51d",
    cluster: "eu",
    useTLS: true
  });

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('/', (req,res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req,res)=>{
    Messages.find((err,data)=>{
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/api/v1/messages/new', (req, res)=>{
    const dbMessage = req.body
    Messages.create(dbMessage, (err,data)=>{
        if (err) {
            res.status(500),send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})

app.listen(port, () => console.log(`Listening on localhost:${port}`));
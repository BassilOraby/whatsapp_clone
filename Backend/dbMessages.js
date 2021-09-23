import mongoose  from "mongoose";

const dataSchema = mongoose.Schema
   ({ message: String,
    name: String,
    timestamp: String,
    received: Boolean})


export default mongoose.model('messagecontent', dataSchema);
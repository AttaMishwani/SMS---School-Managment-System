
const mongoose = require("mongoose")
const dotenv  = require("dotenv")
const app = require("./app")

dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_DB_URI;
const MONGO_DB_URI = process.env.MONGO_DB_URI
// connect to mongo db

mongoose.connect(MONGO_DB_URI).then(() => { console.log("connected to mongodb successfully")

    app.listen(PORT,()=>{
        console.log(`server running on port http://localhost:${PORT}`);
        })
}).catch((err)=>{
    console.log("mongodb connection failed", err)
})
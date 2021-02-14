const dotenv = require("dotenv")
dotenv.config({path: "./config.env"});
const mongoose = require("mongoose")
const app = require("./app")



const DB  = process.env.DATABASE;
const DB_docker = process.env.DATABASE_DOCKER;


const connectToDatabes = async function(){
    try{
        await mongoose.connect("mongodb://localhost:27017/xmemeDB", {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true});
        console.log('Database connection successfull with localhost');
    }catch(err1){
        try{
            await mongoose.connect("mongodb://mongo:27017/xmemeDB", {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true});
            console.log('Database connection successfull with Docker mongo image');
        }catch(err2){
            console.log(err2)
            console.log(err1)
        }
        
    }
}
connectToDatabes();

const PORT = process.env.PORT || 8081

app.listen( PORT, () => {
    console.log( `Listening to port ${PORT}`)
})

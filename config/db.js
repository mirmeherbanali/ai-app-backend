const mongoose = require("mongoose")

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.URL)
        console.log("Database Connected")
    } catch (error) {
        console.error("Connection Faield")
    }
};
module.exports=connectDb;
 import mongoose from "mongoose";
let intlizlied  = false;
export const connectDB = async ()=>{
    mongoose.set("strictQuery",true)
    if (intlizlied){
        console.log("Database is already connected")
        return
    }
    console.log("hi")
    try {
        await
        mongoose.connect(process.env.MONGO_URL,{
            dbName:'Social-web',
            useNewUrlParser: true,
             useUnifiedTopology: true,
        })
        console.log("Database is connected successfully")
        intlizlied = true
    } catch (error) {
        console.log(`Database connectDB.js ${error}`)
    }
}

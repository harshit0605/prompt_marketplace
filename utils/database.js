import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("MongoDB already connected");
        return Promise.resolve();
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: 'shared-prompt',
            useNewUrlParser : true,
            useUnifiedTopology: true
        })

        await mongoose.connection.db.admin().command({ping: 1})
        console.log("Pinged and connected successfully")
    }catch(error){
        console.log(error);
    }
}
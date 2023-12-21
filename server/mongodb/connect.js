import mongoose from "mongoose"

const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
        .then(()=> console.log('mongoDB Connected'))
        .catch((err)=>console.log(err));
}

export default connectDB;
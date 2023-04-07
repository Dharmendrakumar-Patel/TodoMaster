import mongoose from 'mongoose'

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }).then(() => {
        console.log("Database connected successfully")
    }).catch((err) => {
        console.log("Database connection failed", err)
    })
}

export default connectDB

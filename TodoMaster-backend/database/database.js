import mongoose from 'mongoose'

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }).then(() => {
        console.log("Database connected successfully")
    }).catch((err) => {
        console.log("Database connection failed", err)
    })
}

export default connectDB

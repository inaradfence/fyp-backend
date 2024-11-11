
const mongoose = require("mongoose");
const URI = "mongodb+srv://cyberdfence3:Nf2Ib5i39GA4rUoT@cluster0.glc5u.mongodb.net/fypdb?retryWrites=true&w=majority&appName=Cluster0";
const connectDb= async() => {
    try {
        await mongoose.connect(URI);
        console.log('connection established');
    } catch (error) {
        console.log("db connection failed");
        process.exit(0);
    }
}

module.exports= connectDb;
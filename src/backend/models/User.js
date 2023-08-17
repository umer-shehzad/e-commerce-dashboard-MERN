const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

module.exports = mongoose.model("userSchema", userSchema, process.env.CollectionRegister);
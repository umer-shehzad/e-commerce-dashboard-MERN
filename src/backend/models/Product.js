const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
});

module.exports = mongoose.model(process.env.CollectionProduct, productSchema);
// module.exports = mongoose.model("productSchema", productSchema, process.env.CollectionProduct);
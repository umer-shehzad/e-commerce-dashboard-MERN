// const mongoose = require('mongoose');
const express = require('express');
const Jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const app = express.Router();
//use product model
const Product = require('../models/Product');

// make API's
app.post('/add', verifyToken , async (req, res) => {
    const product = new Product(req.body);
    const data = await product.save();
    res.send({result:"success"});
    // res.send(data);
});

app.get('/get/:id', verifyToken , async (req, res) => {
    // get list of all products
    const id = req.params.id;
    const productList = await Product.find({ userId:id });
    if ( productList.length > 0 ){
        res.send(productList)
    }else{
        res.status(404).send({result:"No Result Found."});
    }
});

app.delete('/delete/:id', verifyToken , async (req, res) => {
    const id = req.params.id;
    const result = await Product.deleteOne({ _id:id })
    res.send(result);
});

app.get('/get-single/:id', verifyToken , async (req, res) => {
    // get single product via id
    const id = req.params.id;
    const data = await Product.findOne({ _id:id });
    if (data){
        res.send(data)
    }else{
        res.status(404).send({result:'No Record Found'});
    }
});

app.put('/update/:id', verifyToken , async (req, res) => {
    const id = req.params.id;
    let data = await Product.updateOne(
        { _id : id },
        { $set : req.body }
    )
    res.send(data);
});

app.get('/search/:id/:key', verifyToken , async (req, res) => {
    const id = req.params.id;
    const data = await Product.find({
        userId:id,
        "$or":[
            { name : { $regex : req.params.key } },
            { price : { $regex : req.params.key } },
            { company : { $regex : req.params.key } },
            { category : { $regex : req.params.key } }
        ]
    });
    res.send(data);
});

// middleware to verify token
function verifyToken (req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')['1'];
        Jwt.verify( token, process.env.jwtKey, (err, valid) =>{
            if (err) {
                res.status(401).send({ result: "Please provide valid token." })
            }
            next();
        })
        
    } else {
        res.status(403).send({ result: "Please add token with header." })
    }
}

module.exports = app;
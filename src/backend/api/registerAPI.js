const mongoose = require('mongoose');
const express = require('express');
const Jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const app = express.Router();
// import model
const User = mongoose.model('userSchema');

// make API's
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try{
        //if any field is empty, bad request error
        if( !(name && email && password) ){
            res.status(400).send( {result: 'Please fill all fields to register.'} );
        }

        //if user is already present in database(check its email), do not register
        let user = await User.findOne( { email } );
        if (user){
            res.status(409).send( { result:'User Already Register' } );
        } else {
            const inputRecords = {
                "name" : name,
                "email" : email,
                "password" : password
            }
            
            //create a new user
            const newUser = new User(inputRecords);
            //save the new user
            await newUser.save();
            res.status(200).send( {result : 'User Register Successfully'} );
        }
    } catch (e) {
        console.log('Issue in POST - Register API ', e);
    } 
});

app.post('/login', async (req, res) => {
    if ( req.body.password && req.body.email ){
        // eliminate password from user data, if present in database
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            Jwt.sign({ user }, process.env.jwtKey, { expiresIn:"2h" }, (err, token)=>{
                if (err) {
                    res.send( {result:"Something went wrong with token."} );        
                }
                res.status(200).send( {result:user, auth:token} );    
            })
        } else {
            res.status(401).send( {result:"Unauthorized: User Not Matched."} );
        }
    } else {
        res.status(400).send( {result:"Bad Request: Either password or Email is missing."} );
    }
});


module.exports = app;
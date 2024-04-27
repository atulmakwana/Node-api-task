const express = require('express');
const app=express();
const mongoose = require('mongoose');
const { MONGOURI } = require('./config/devlopment')


app.use(express.json());
const { router } = require('./api');
app.use('/',router);


mongoose.connect(MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB successfully...');
    })
    .catch((error) => {
        console.error('Error while connecting to MongoDB!:', error);
    });


app.listen(3000,()=>{
    console.log("Listening on 3000...");
});
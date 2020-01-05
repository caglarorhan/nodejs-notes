const express = require('express');
const app = express();

// middlewares

app.use( '/add-product', (req, res, next)=>{
    console.log( '1. Middleware testi');
    res.send('<h1>Add Product</h1>');
});

app.use( '/', (req, res, next)=>{

    res.send('Hello from express');
});

app.listen(3000);

 
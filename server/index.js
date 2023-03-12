require("dotenv").config();

const express = require("express");
const app = express();
const axios = require('axios');
const api_key = process.env.API_KEY;

app.get('/info/:symbol', (req,res) => {
    const symbol = req.params.symbol;
    const url = `https://api.iex.cloud/v1/data/CORE/QUOTE/${symbol}?token=${api_key}`;
    //const url = `https://api.iex.cloud/v1/data/CORE/HISTORICAL_PRICES/${symbol}?token=${api_key}`;
    console.log(url);
    axios.get(url)
    .then(response => {
        console.log(response.data[0]);
        res.send(response.data[0])
    })
    .catch(err => {
        console.log("Error:", err.message)
    }); 
});

app.get('/pic/:symbol', (req,res) => {
    const symbol = req.params.symbol;
    const url = `https://storage.googleapis.com/iex/api/logos/${symbol}.png`;
    console.log(url);
    axios.get(url, {responseType: 'arraybuffer'})
    .then(response => {
        console.log(response.data);
        res.send(response.data)
    })
    .catch(err => {
        console.log("Error:", err.message)
    });
});

app.listen(5001, () => {
    console.log("Listening on port: 5001")
});
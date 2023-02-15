const express = require('express');
const router = express.Router();
const path = require('path')
require('dotenv').config();
const API_KEY = process.env.API_KEY

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/image', async (req, res) => {
    // let payload = req.body.payLoad;
    // console.log(JSON.parse(req.body.payLoad))
    fetch("https://api.openai.com/v1/images/generations", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "prompt": `${await req.body.payload}`,
            "n": 1,
            "size": `256x256`,
            "response_format": 'url'
        })
    })
    .then(response => {
        return response.json();
    })
    .then(data=>{
        APIResponse =  data;
        console.log(data);
        pictureUrl= APIResponse.data[0].url;
        return pictureUrl;
    })
        .catch(error => {
            console.log(error)
        })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err.errors[0].message);
    })});

router.post('/text', async (req, res) => {
    console.log(await req.body.payload);
    fetch("https://api.openai.com/v1/completions", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": [`make the following a caption for a scene ${await req.body.payLoad}`],
            "max_tokens": 100,
            "temperature": .9,
        })
    })
    .then(response => {
        return response.json()
    })
    .then(data=>{
        APIResponse = data.choices[0].text;
        return APIResponse;
        // captions.undefined returns back the string.
    })
        .catch(error => {
            console.log(error)
        })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err.errors[0].message);
    })});


module.exports = router

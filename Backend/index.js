const express = require('express');  //importing express framework
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var request = require('request');
var cors = require('cors')
app.use(cors())

app.use(morgan('short'));
app.use(bodyParser.json());


app.post("/nasa", async (req, res) => {
    try {
        let nasaLink = "https://api.nasa.gov/planetary/apod?api_key=XIy5nOrHwMRhkpCXs7yxAF3tMD3vYYEofMqfa1II";
        let { date } = req.body;
        nasaLink += `&date=${date}`
        let rec = await requestEssentials(nasaLink)
        res.status(200).json({ rec })
    } catch (err) {
        res.status(500).json({ err })
    }

});

/*app.post("/image", async (req,res) => {
    try {
        
        let nasaLink = "https://api.nasa.gov/planetary/apod?api_key=XIy5nOrHwMRhkpCXs7yxAF3tMD3vYYEofMqfa1II";
        const date = new Date('2021-01-09');
        nasaLink += `&date=${"today"}`
        let rec = await requestEssentials(nasaLink)
        console.log("rec",rec);
        res.status(200).json({ rec })
    } catch (err) {
        res.status(500).json({ err })
    }
})*/

function requestEssentials(rec) {
    return new Promise((resolve, reject) => {
        var requestOptions = {
            url: `${rec}`, //remote API calls
            method: 'GET'
        };

        request.get(requestOptions, (error, response, body) => {
            if (error) {
                console.log('Error', error);
                reject(error);
            } else {
                // let p = JSON.parse(body)
                resolve(JSON.parse(body))
            }
        })
    })
}


const port = 5000;
app.listen(port, () => console.log(`Server is up and listening on Port ${port} ...`));

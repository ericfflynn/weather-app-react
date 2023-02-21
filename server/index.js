
const path = require("path");
const express = require("express");
const app = express(); 
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.APIKEY;


app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));


app.get("/weather/:location", (req, res) => {
    const {location} = req.params;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ff8b85cbe6a39f0e7497223ee8a1f967&units=imperial`)
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error("Invalid City Name");
    })
    .then((data) => {
        res.json(data)
    })
    .catch((error)=> {
        res.status(404).send("Bad request")
    }
    )
})



app.listen(5001, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
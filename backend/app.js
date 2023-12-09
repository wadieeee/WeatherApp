const axios = require('axios');
const converter = require('json-2-csv');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');

const express = require("express")

const app = express()

app.use(cors())

app.get("/weather/:name", (req, res) =>{
  cleanData = {}
  getWeather(req.params.name).then( (data) => {
    cleanData.country = data.sys.country;
    cleanData.city = data.name; 
    cleanData.temp = data.main.temp;
    cleanData.temp_min = data.main.temp_min;
    cleanData.temp_max = data.main.temp_max;
    cleanData.humidity = data.main.humidity;
    cleanData.wind_speed = ToKilometersPerHour(data.wind.speed);

    res.send(data)
  }).catch((err) => {
      console.log(err.response.data.message)
  })
})

app.get("/forecast/:name", (req, res) =>{
  cleanData = []
  getforecast(req.params.name).then( (dataa) => {

    res.send(dataa.list.slice(0,5))
    
  })
})

app.listen(3000, () =>{
  console.log("started")
})

const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.API_KEY}&units=metric`;
    const response = await axios.get(url);
    return response.data;
}

const getforecast = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${process.env.API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
}


function ToKilometersPerHour(mps) {
  return mps * 3.6;  
}


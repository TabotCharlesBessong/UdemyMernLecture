
const express = require('express')
const https = require('https')
const app = express()
const apikey = "37fd7d3749b04ba0802c2bd660ea6ee2"
const url =  "https://api.openweathermap.org/data/2.5/weather?q=Douala&appid="+apikey+"&units=metric"


const port = 3000
app.listen(port,()=>{
  
  console.log(`The server is up and runnig at port ${port}`);
})

app.get('/',(req,res)=>{
  https.get(url,(response)=>{
    response.on("data",(data)=>{
      const weatherInfo = JSON.parse(data)
      const weather = weatherInfo.weather[0].main 
      const image = weatherInfo.weather[0].icon
      const imgUrl = "http://openweathermap.org/img/wn/"+ image+"@2x.png"
      const temperature = weatherInfo.main.temp 
      res.write(`<h1>The weather in Douala is   ${weather}</h1><br><br>`)
      res.write("<img src="+imgUrl+" alt=${weather} />")
      res.write(`<h3> And The temperature in Douala is   ${temperature}   degree Celcius</h3>`)
      res.send()
    })
  })
}) 
const express = require('express')
const https = require('https')
const app = express()
const bodyparser=require("body-parser");

app.use(bodyparser.urlencoded({extended:true}))
app.get('/', (req, res) => {
     res.sendFile(__dirname+"/index.html")
  
})
app.post('/',(req,res)=>{
const query=req.body.city;
const appid="99d4c1c6182bbacb377ea8cf3852eb09";

const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units=metric"

https.get(url, (response) => {
  console.log(response.statusCode)
  response.on("data",(data)=>{
      const weatherdata=JSON.parse(data)
      const temp=weatherdata.main.temp;
      const desc=weatherdata.weather[0].description;
      res.write("<h1>The temperature in " + query  +"  is  "+  temp +"<h1/>" );
      res.write("<p> The weather description is  "+ desc +"<p/>");
      res.send();
  })
})
})

app.listen(3000, () => {
  console.log('server started at port 3000')
})
 















//99d4c1c6182bbacb377ea8cf3852eb09

const request = require('request')

const weather = (lat , lon , callback) =>
{

const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&' + 'lon=' + lon + '&appid=38323479002b422af4a77475b5ad4b03&units=metric'

request({url , json: true}, (error,{body}) =>{
    
    if(error)
    {
        callback('Unable to connect to weather servies!',undefined)
    }
    else if(body.name==="")
    {
        callback('Unable to find location!',undefined)
    }
    else
    {
        callback(undefined,{
            temp: body.main.temp,
            description: body.weather[0].description                
        })
    }
})
}
module.exports = weather

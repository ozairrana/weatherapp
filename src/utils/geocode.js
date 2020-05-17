
const request = require('request')

const geocode = (address,callback) =>
{
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib3phaXJyYW5hIiwiYSI6ImNrYThwZHVueDBmN2cycnBjdjYzOWt1ZmsifQ.cK8waPJN0OVk2rGNHeItDA&limit=1'

request({url ,json:true},(error,{body})=>{
    if(error)
    {
        callback('Unable to connect to location services!',undefined)
    }
    else if(body.features.length === 0)
    {
        callback('Unable to find location! Try another search!',undefined)
    }
    else
    {
        callback(undefined,{
            lon: body.features[0].center[0],
            lat: body.features[0].center[1],
            loc: body.features[0].place_name
        })
    }
})
}

module.exports = geocode
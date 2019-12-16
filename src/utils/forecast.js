const request = require('request')


const forecast = (latitude, longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/658d8ac0d4457e78ec38a509933758d2/'+ latitude + ','+ longitude 
   // console.log(url)
    request({url, json:true}, (error, {body})=>{
        if (error){
            callback('Unable to reach weather service', undefined)
        }else if (body.error){
            callback('Invalid value of longitute or latitude. Please try again ')
        } else{
            console.log(body.daily.data[0])
           callback(undefined, {
               summary : body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+ body.currently.precipProbability+'% of rain. Higest today will be '+ body.daily.data[0].temperatureHigh+ ' and lowest will be ' + body.daily.data[0].temperatureLow
           })
        }
    })
}


module.exports = forecast 
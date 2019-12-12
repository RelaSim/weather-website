const request = require('request')

const geocode = (address, callback)=>{
    const coordinateUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3Vyc3VyYSIsImEiOiJjazNjMjBqaDYwODhvM2ludXdoNXc4b2tyIn0.RCl9u0_nzAy19BeUGejBKw&limit=1'
    console.log(coordinateUrl)
    request({url:coordinateUrl, json:true}, (error, {body})=>{
        
        if (error){
            console.log('unable to reach geolocation service')
            callback('unable to reach geolocation service')
        }else if(body.features.length===0) {
            console.log('uanble to find location. try another search')
            callback('uanble to find location. try another search', {
                latitude:'',
                longitude:'',
                location:''
            })
        }
        else{
            //console.log(response.body.features[0].place_name)
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode
const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')



const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//express documentation : http://expressjs.com/en/4x/api.html#app
const app = express()
const port = process.env.PORT || 3000
//set up static directory to serve
app.use(express.static(publicDirectoryPath))
//set up handle bar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name : 'suresh'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        message: 'This is dynamic message',
        title: 'Help',
        name : 'Suresh'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name : 'Suresh'
    })
})

app.get('/weather', (req, res)=>{
    console.log(req.query)
    if(!req.query.address){
        return res.send({
            error : 'Address not provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if (error){
            console.log('geo location not found')
            return res.send({
                error : error
            })    
        }else{
            forecast(latitude, longitude, (error, forecaseData) => {
                if (error){
                    return res.send({
                        error : error
                    })    
                }
                return res.send({
                    forecast: forecaseData.summary,
                    location : location,
                    address : req.query.address
                })
                // console.log(location)
                // console.log(forecaseData.summary)
              })
        }
        
    })
     
    
})

app.get('/help/*', (req, res)=>{
    res.render('error',{
        errorMsg : 'Help article not found',
        title : "Error",
        name : 'Suresh'
    })
})


app.get('*', (req, res)=>{
    res.render('error', {
        errorMsg : 'Page not found',
        title : 'Error',
        name : 'Suresh'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})


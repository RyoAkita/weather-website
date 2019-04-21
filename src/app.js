const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(path.join(__dirname, '../public'))
const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Set up handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// setup static directoty to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rio'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT',
        name: 'Rio'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        detail: 'how to forecast weather',
        name:'Rio'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address) {
        return res.send({
            error: 'You must provide awailable address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
        return res.send({ error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if(error) {
            return res.send({ error})
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
    })

    // res.send({
    //         forecast: 'Sunny!',
    //         location: 'Whereever you are',
    //         address: req.query.address
    //     })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'ERROR',
        name: 'Rio'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title:'ERROR',
        name: 'Rio'
    })
})
//app.com
app.listen(port, () => {
    console.log('Server is up on port' + port)
})
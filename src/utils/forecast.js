const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8ff7697c1fa3ad003183871acfc25676/' + latitude +',' + longitude +'?units=si';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location', undefined);
        } else if(body.error) {
            callback('Not found location', undefined)
        } else {
            callback(undefined, {
               temperature: body.currently.temperature,
               possibility: body.currently.precipProbability
            })
        }
    })

}

module.exports = forecast
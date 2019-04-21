const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherFrom.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    messageOne.innerHTML = 'Loading...'
    messageTwo.innerHTML = ''
    console.log(location)

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
    if(data.error) {
        messageOne.innerHTML = data.error;
    } else {
        messageOne.innerHTML = '場所: ' + data.location;
        messageTwo.innerHTML = '気温: ' + data.forecast.temperature;
        console.log(data.location)
        console.log(data.forecast)
    }
        })
    })
    


})
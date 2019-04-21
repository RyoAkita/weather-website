const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');
const messageThree = document.getElementById('message-3');
const messageFour = document.getElementById('message-4');



weatherFrom.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    messageOne.innerHTML = 'Loading...'
    messageTwo.innerHTML = ''
    messageThree.innerHTML = ''
    messageFour.innerHTML = ''

    console.log(location)

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
    if(data.error) {
        messageOne.innerHTML = data.error;
    } else {
        messageOne.innerHTML = '場所: ' + data.location;
        messageTwo.innerHTML = '気温: ' + data.forecast.temperature + '度';
        messageThree.innerHTML = '湿度: ' + data.forecast.humidity + '%';
        messageFour.innerHTML = '風速: ' + data.forecast.windSpeed + 'm/s';
        console.log(data.location)
        console.log(data.forecast)
    }
        })
    })
    


})
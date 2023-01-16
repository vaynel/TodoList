

let getWeather = async coords => {
    const APP_ID = '457f5b804d064122e283076003b2abe6';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

    let params = {
        lat: coords.lat,
        lon: coords.log,
        appid: APP_ID,
        lang: 'kr',
        units: 'metric'
    }

    let res = await fetch(apiUrl + getQueryString(params));
    return res.json();
}

let getUserCoord = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                lat: position.coords.latitude,
                log: position.coords.longitude
            });
        }, error => {
            reject(error);
        });

    })

}

(async () => {
    let coords = await getUserCoord();
    let weatherData = await getWeather(coords);
    // console.dir(weatherData);

    //name,main.temp
    let weatherDiv = $(`.weather`);
    let weatherSpan = createElement('span',{text:`${weatherData.main.temp}℃ @ ${weatherData.name}`})
    weatherDiv.append(weatherSpan);
})();


const city = document.querySelector('#city')


const button = document.querySelector("button")
const locationname = document.querySelector('#locationName');
const temperature = document.querySelector('#temperature');
const description = document.querySelector("#description");
const weatherInfo = document.querySelector("#weatherInfo");
const errorinfo = document.querySelector("#errorinfo")
const errordata = document.querySelector("#errordata")


function processWeatherData(data) {
    // Extract relevant data from the API response
    const weatherInfo2 = {
        city: data.address, // City name
        latitude: data.latitude, // Latitude
        longitude: data.longitude, // Longitude
        currentTemperature: data.currentConditions.temp, // Current temperature
        description: data.description, // Weather description
        conditions: data.currentConditions.conditions, // Additional condition information
        time: data.currentConditions.datetime, // Time of data
        timezone: data.timezone // Timezone
    };
    return weatherInfo2;
}



button.addEventListener('click',function(event){
    event.preventDefault()
    let search = city.value
    if (search === "") {
        weatherInfo.classList.add('hidden');
        errorinfo.classList.remove('hidden');
        errordata.textContent = "Please enter a city name."; 
        return;
    }
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?key=YE53D6BGDQULJTBVKTZAQPQ5X`,
        {mode:"cors"})
        .then(response => response.json())
        .then(data => {
            const weatherData = processWeatherData(data); 
            console.log(weatherData);
            const tempCelsius = ((weatherData.currentTemperature - 32) / 1.8).toFixed(1);
            weatherInfo.classList.remove('hidden');
            errorinfo.classList.add('hidden');
            locationname.textContent = weatherData.city;
            temperature.textContent = `Temperature: ${tempCelsius}°C`;
            description.textContent = weatherData.conditions;
            
        })
        .catch((err) =>{
            weatherInfo.classList.add('hidden');
            errorinfo.classList.remove('hidden')
            errordata.textContent = `Unable to find data`;
            console.log("Unable to find data",err)
            if(city.value === ""){
                errordata.classList.add('hidden')
            }

        })
})

city.addEventListener('input', function() {
    if (city.value === "") {
        weatherInfo.classList.add('hidden');
        errorinfo.classList.add('hidden');
    }
});
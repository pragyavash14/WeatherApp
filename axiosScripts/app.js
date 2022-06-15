//All API calls:
const key = 'vNdXf68uyA1OEOEKOXuIsGAUoNWdSshy';

const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    const getcityurl = base + query;

    const response = await axios.get(getcityurl);

    if(response.status !==200){
        throw new Error("Error while getting city data");
    }
    const cityData = response.data;
    console.log(cityData);
    return cityData[0];
}

const getWeather = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
    const getweatherurl = base + query;

    const response = await axios.get(getweatherurl);

    if(response.status !== 200) {
        throw new Error("Error while Getting Weather Info");
    }

    const weatherData = response.data;
    console.log(weatherData); 
    return weatherData[0];
}


//DOM manipulation:

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const icon = document.querySelector('.icon img');
const time = document.querySelector('img.time');

const updateUI = data => {
    const cityData = data.cityData;
    const weatherData = data.weatherData;

    //add all city and weather details
    details.innerHTML = `
    <h5 class="my-3">${cityData.EnglishName}</h5>
    <div class="my-3">${weatherData.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weatherData.Temperature.Metric.Value}</span>
        <span>&degC</span>
    </div>
    `;
    //add day/night image
    icon.setAttribute('src',`img/icons/${weatherData.WeatherIcon}.svg`);
    
    let weatherSrc = null;

    if(weatherData.IsDayTime)
    timeSrc = 'img/day.svg';
    else timeSrc = 'img/night.svg';

    time.setAttribute('src',timeSrc);



    //make card div display if hidden:
    if(card.classList.contains('d-none'))
    card.classList.remove('d-none');
}



const updateCity = async (city) => {
    const cityData = await getCity(city);
    const weatherData = await getWeather(cityData.Key);

    return {
        cityData : cityData,
        weatherData : weatherData
    }

}



cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => updateUI(data) )
        .catch(err => console.error(err) );
        


})
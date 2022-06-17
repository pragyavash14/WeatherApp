//This file is for DOM manipulation

const cityForm = document.querySelector('form');
const card = document.querySelector('.card'); //get card element by card class
const details = document.querySelector('.details'); //get details element by details class name
const time = document.querySelector('img.time'); //image with class of 'time'
const icon = document.querySelector('.icon img'); //div with class of 'icon', then image inside that


const updateUI = (data) => {
    const cityDets = data.cityDets;
    const weather = data.weather;

    //destructure properties --could assign data directly to 2 properties of an object, JS will understand
    // const {cityDets, weather} = data;

    //update details:
    details.innerHTML = ` 
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="container display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&degC</span>
        </div>
        `;

    //update day/night and icon svgs
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    console.log("icon: ",iconSrc);
    icon.setAttribute('src', iconSrc);
    let timeSrc = null; 

    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else timeSrc = 'img/night.svg';

    time.setAttribute('src', timeSrc);
    

    //remove d-none class on card, if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}

const updateCity = async (city) => {
    console.log(city);
    const cityDets = await getCity(city);
    const weather = await getWeatherInfo(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    };
}



cityForm.addEventListener('submit', e => {
    //prevent default action of refreshing
    e.preventDefault();
    //get City Value
    const city = cityForm.city.value.trim(); //trim in case of any white space
    cityForm.reset();


    //Update UI with city info 
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //set local storage for refreshing the page with already loaded data
    localStorage.setItem('city',city);
})

//this code is not inside any event listener so it will automatically run every time application starts or refreshes
if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
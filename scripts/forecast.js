//This File is for interacting with APIs

const key = 'vNdXf68uyA1OEOEKOXuIsGAUoNWdSshy';

//Get weather Information
const getWeatherInfo = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}` //again, first ID bc it's part of regular url, then qurry parameter starts with ?
    const getWeatherURL = base + query;

    const response = await fetch(getWeatherURL);
    
    if(response.status !== 200) {
        throw new Error("Error while fetching getWeatherURL");
    }

    const data = await response.json();
    return data[0];
}

//Get City Information
const getCity = async (city) => {
     //making API url:
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`; //query starts with ? //use & before adding next query parameter
    const getCityURL = base + query;

    const response = await fetch(getCityURL);
    
    if(response.status !== 200) {
        throw new Error("Error while fetching GetCityURL");
    }

    const data = await response.json();
  //  console.log(data[0]); //we only want the first object in the response so, only return that object
    return data[0];
}

// getCity('dublin').then(data => {
//     return getWeatherInfo(data.Key);
//     }).then(data => console.log(data))
//     .catch(err => console.log(err));
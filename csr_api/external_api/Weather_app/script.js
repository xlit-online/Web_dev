const API_KEY = "594dd6d0b466f8e71a9f3a6d37ca13ec";

const cityName = document.getElementById("cityName");
const searchBtn = document.getElementById("searchBtn");

const cityE1 = document.getElementById("city");
const tempE1 = document.getElementById("temp");
const descE1 = document.getElementById("desc");

searchBtn.addEventListener("click", async() =>{
    const city = cityName.value;

    if(!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if(data.cod !== 200){
        cityE1.textContent = "City not found";
        return;
    }

    cityE1.textContent = data.name;
    tempE1.textContent = `Temp: ${data.main.temp} °C`;
    descE1.textContent = data.weather[0].description;

});
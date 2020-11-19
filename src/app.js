let meteo=document.getElementById('meteo');
let temperatura=document.getElementById('temperatura');
let minima=document.getElementById('minima');
let massima=document.getElementById('massima');
let umidita=document.getElementById('umidita');
let sfondo=document.getElementById('sfondo');
let citta=document.getElementById('city');
let input=document.getElementById('input');
let button=document.getElementById('button')



const apy_key=process.env.APY_KEY;

//Geolocalizzazione
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}

function setPosition(position){
  let lon=position.coords.longitude;
  let lat=position.coords.latitude;
  getWeather(lat,lon);
}

function showError(error){
  alert('Errore nella geolocalizzazione');
}


async function getWeather(lat,lon){
  let response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+apy_key);
  let weather= await response.json();
  change(weather);
}





button.addEventListener('click', showWeather);

async function showWeather(){
    let response =await fetch("https://api.openweathermap.org/data/2.5/weather?q="+input.value+"&units=metric&appid="+apy_key);
    if (!response.ok) {
    alert('Città errata');
  }else{
    let weather= await response.json();
    change(weather);
  }
}

function change(weather){

let cittaV=weather['name'];
let temperaturaV=weather['main']['temp'];
let minimaV=weather['main']['temp_min'];
let massimaV=weather['main']['temp_max'];
let umiditaV=weather['main']['humidity'];
let meteoV=weather['weather'][0]['main'];

citta.innerHTML=cittaV;
temperatura.innerHTML=temperaturaV+'°';
minima.innerHTML='Temperatura minima: '+minimaV+'°';
massima.innerHTML='Temperatura massima: '+massimaV+'°';
umidita.innerHTML='Umidità: '+umiditaV+'%';

if(meteoV=='Clear'){
  sfondo.style.background="url(img/sunny.jpg) no-repeat center top";
  meteo.src="img/sun.svg";
  meteo.style.display="flex";
}else if (meteoV=='Thunderstorm') {
  sfondo.style.background="url(img/rain.jpg) no-repeat center top";
  meteo.src="img/thunderstorm.svg";
  meteo.style.display="flex";
}else if (meteoV=='Drizzle') {
  sfondo.style.background="url(img/rain.jpg) no-repeat center top";
  meteo.src="img/rainy.svg";
  meteo.style.display="flex";
}else if (meteoV=='Rain') {
  sfondo.style.background="url(img/rain.jpg) no-repeat center top";
  meteo.src="img/rainy.svg";
  meteo.style.display="flex";
}else if (meteoV=='Snow') {
  sfondo.style.background="url(img/cloud.jpg) no-repeat center top";
  meteo.src="img/snowflake.svg";
  meteo.style.display="flex";
}else if (meteoV=='Clouds') {
  sfondo.style.background="url(img/cloud.jpg) no-repeat center top";
  meteo.src="img/cloud.svg";
  meteo.style.display="flex";
}else if (meteoV=='Mist'||meteoV=='Fog'||meteoV=='Smoke'||meteoV=='Haze'||meteoV=='Dust'||meteoV=='Sand'||meteoV=='Ash'||meteoV=='Squall'||meteoV=='Tornado') {
  sfondo.style.background="url(img/cloud.jpg) no-repeat center top";
  meteo.src="img/fog.svg";
  meteo.style.display="flex";
}

}

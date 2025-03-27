const apiKey = "00613c280da34575a0b101301252403";

const searchBtn = document.querySelector("#searchBtn");
const weatherContainer = document.querySelector("#weatherContainer");
const conditionText = document.querySelector("#conditionText");
const conditionImage = document.querySelector("#conditionImage");
const searchInputBox = document.querySelector("input");

// searchBtn.addEventListener("click", apiHandler);
searchBtn.addEventListener("click",apiHandler);



async function apiHandler() {
  const searchedLocation = searchInputBox.value;
  console.log("Serach Btn clicked");
  searchInputBox.value="";
  const url= `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchedLocation}&aqi=yes`;
  const response = await fetch(url);

  if(response.status==400){
    alert("Invalid Location");
    return null;
  }else if(response.status==200){
    const jsonData=await response.json();

    weatherShow(jsonData);
    locationShow(jsonData);

  }
  else{
    alert("Something went worng, try again");
    return null;
  }
  
}


const locationShow = (jsonData) => {
  // Location card Element selection
  const locationCard = document.querySelector("#location-card");

  const locationVar = document.querySelector("#Name");

  const countryVar = document.querySelector("#country");

  const regionVar = document.querySelector("#region");

  const coordinatesVar = document.querySelector("#coordinates");

  const timeVar = document.querySelector("#time");

  const timeZoneVar = document.querySelector("#timeZone");

  //Api data extraction
  const name = jsonData.location.name;
  const country = jsonData.location.country;
  const region = jsonData.location.region;
  const lat = jsonData.location.lat;
  const lon = jsonData.location.lon;
  const time = jsonData.location.localtime;
  const timezone = jsonData.location.tz_id;

  // Extracted data shown based on location in card

  locationVar.textContent = name;
  countryVar.textContent = country;
  regionVar.textContent = region;
  coordinatesVar.textContent = lon + "/" + lat;
  timeVar.textContent = time;
  timeZoneVar.textContent = timezone;

  // Display the location card
  locationCard.style.display = "block";
};
const weatherShow = (jsonData) => {
  // Selection of element from UI card component;

  const weatherCard = document.querySelector("#weather-card");
  const weatherIconElem = document.querySelector("#weatherIcon");
  const weatherTextElem = document.querySelector("#condition");
  const temp_C_Elem = document.querySelector("#temp-c");
  const temp_F_Elem = document.querySelector("#temp-f");
  const feelsLikeElem = document.querySelector("#feelsLike");
  const humidityElem = document.querySelector("#humidity");
  const windElem = document.querySelector("#wind");
  const gustElem = document.querySelector("#gust");
  const pressureLabel = document.querySelector("#pressure");
  const visibilityLabel = document.querySelector("#visibility");
  const dewLabel = document.querySelector("#dew");
  const uvLabel = document.querySelector("#uv");
  const lastUpdatedLabel = document.querySelector("#lastUpdated");

  //Extract data from api

  const weatherIconData = jsonData.current.condition.icon;
  const weatherTextData = jsonData.current.condition.text;
  const temp_C_Data = jsonData.current.temp_c;
  const temp_F_Data = jsonData.current.temp_f;
  

  //show data on ui
  weatherIconElem.setAttribute("src", weatherIconData);
  weatherTextElem.textContent = weatherTextData;
  temp_C_Elem.textContent = temp_C_Data + "°C";
  temp_F_Elem.textContent = "("+ temp_F_Data + "°F )";
  //

  // show the weather card

  weatherCard.style.display = "block";
};

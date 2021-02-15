const weatherWindow = document.querySelector(".weather");
const dives = weatherWindow.querySelectorAll("div");
const img = weatherWindow.querySelector("img");

const API_KEY = "c4e9570113deee53fd79eee810aab0e5";

const localWhere = JSON.parse(localStorage.getItem("Coords"));

const getWeather = (Where) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${Where.latitude}&lon=${Where.longitude}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      const weather = json.weather[0].icon; //http://openweathermap.org/img/w/10d.png
      const weatherName = json.weather[0].main;
      dives[0].innerText = place;
      dives[1].innerText = weatherName;
      dives[2].innerText = `${temperature}도`;
      img.src = `http://openweathermap.org/img/w/${weather}.png`;
    });
};

const successFunc = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const Where = { longitude, latitude };
  localStorage.setItem("Coords", JSON.stringify(Where));
  getWeather(Where);
};

const failFunc = () => {
  console.log("실패");
};

const getGeoLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunc, failFunc);
  }
};

if (localWhere) {
  getWeather(localWhere);
} else {
  getGeoLocation();
}

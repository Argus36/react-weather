import { useState, useEffect } from "react";

const apiKey = 'a0f70c987f34020bed31937efb870a46';

function App() {

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [windDirection, setWindDirection] = useState(null);




  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, [lat, lon]);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      getWeatherData();
    }
  }, [lat, lon]);

  const getWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=ru`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  function windeg(num) {
    if (0 < num && num < 30) {
      return('С');
    }
    if (30 <= num && num < 60) {
      return('С-В');
    }
    if (60 <= num && num < 120) {
      return('В');
    }
    if (120 <= num && num < 150) {
      return('ЮГ-В');
    }
    if (150 <= num && num < 210) {
      return('ЮГ');
    }
    if (210 <= num && num < 240) {
      return('ЮГ-З');
    }
    if (240 <= num && num < 300) {
      return('З');
    }
    if (300 <= num && num < 330) {
      return('З-С');
    }
    if (330 <= num && num < 360) {
      return('С');
    }
  }

function aM(gpa) {
  const mmRtSt = gpa * 0.750064;
  return(mmRtSt);
}

function sunR(date) {
  const god = new Date(date * 1000);
  if (god.getMinutes() < 10) {
    return(`${god.getHours()}:0${god.getMinutes()}`);
  }else {
    return (`${god.getHours()}:${god.getMinutes()}`)
  }
}
function sunS(date) {
  const god = new Date(date * 1000);
  return (`${god.getHours()}:${god.getMinutes()}`)
}

function background(back_weather) {
  switch (back_weather) {
    case 'ясно':
      return (
        {background: `linear-gradient(165deg, rgb(252, 201, 24) 0%, rgb(255, 255, 255) 40%, rgb(195, 241, 254) 80%)`}
      );
      break;
    case 'небольшая облачность':
      return (
        {background: `linear-gradient(165deg, rgb(194, 194, 194) 0%, rgb(255, 255, 255) 40%, rgb(195, 241, 254) 80%)`}
      );
      break;
    case 'пасмурно':
      return (
        {background: `linear-gradient(165deg, rgb(63, 63, 63) 0%, rgb(255, 255, 255) 40%, rgb(195, 241, 254) 80%)`}
      );
      break;
    case 'небольшой дождь':
      return (
        {background: `linear-gradient(145deg, rgb(152, 231, 255) 0%, rgb(255, 255, 255) 40%, rgb(195, 241, 254) 80%)`}
      );
      break;
    case 'снег':
      return (
        {background: `linear-gradient(165deg, rgb(25, 0, 255) 0%, rgb(255, 255, 255) 40%, rgb(195, 241, 254) 80%)`}
      );
      break;
    default:
      return (
        {background: `linear-gradient(165deg, #BCE7F4 5%, #82C8DD 17%, #F6AB79 37%, #818CD2 61%, #252F72 79%, #11194E 93%)`}
      )
      break;
  }
}

  return (
    <div className="App">
        {!weatherData ? (
          <div style={{background: `linear-gradient(165deg, #BCE7F4 5%, #82C8DD 17%, #F6AB79 37%, #818CD2 61%, #252F72 79%, #11194E 93%)`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`}} className="weater_container">
            <p style={{fontSize: `3vw`}}>Загрузка ...</p>
          </div>
        ) : (
          <div style={{background: `linear-gradient(165deg, #BCE7F4 5%, #82C8DD 17%, #F6AB79 37%, #818CD2 61%, #252F72 79%, #11194E 93%)`}} className="weater_container">
            <div className="phone">
              <p>Широта : '{lat}'</p>
              <p>Долгота : '{lon}'</p>
              <p>Название города : '{weatherData.name}'</p>
              <p>Фактическая температура : '{weatherData.main.temp}'</p>
              <p>Как ощущается '{weatherData.main.feels_like}'</p>
              <p>Сама погода : '{String(weatherData.weather[0].description).charAt(0).toUpperCase() + String(weatherData.weather[0].description).slice(1)}'</p>
              <p>Облачность : '{weatherData.clouds.all}%'</p>
              <p>Скорость ветра : '{weatherData.wind.speed}'</p>
              <p>Направление : '{windeg(weatherData.wind.deg)}'</p>
              <p>Атмосферное давление : '{aM(weatherData.main.grnd_level)} мм рт.ст'</p>
              <p>Влажность : '{weatherData.main.humidity}%'</p>
              <p>Время восхода солнца : {sunR(weatherData.sys.sunrise)}</p>
              <p>Время захода солнца : {sunS(weatherData.sys.sunset)}</p>
            </div>
          </div>
        )}
      <div className="sun_container">
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, dignissimos unde corporis et ullam quam cum dicta vel possimus reiciendis illo voluptatibus sed saepe molestias tenetur esse facilis, nemo libero?</h1>
      </div>
    </div>
  );
}

/*
  <p>Широта : '{lat}'</p>
  <p>Долгота : '{lon}'</p>
  <p>Название города : '{weatherData.name}'</p>
  <p>Фактическая температура : '{weatherData.main.temp}'</p>
  <p>Как ощущается '{weatherData.main.feels_like}'</p>
  <p>Сама погода : '{String(weatherData.weather[0].description).charAt(0).toUpperCase() + String(weatherData.weather[0].description).slice(1)}'</p>
  <p>Облачность : '{weatherData.clouds.all}%'</p>
  <p>Скорость ветра : '{weatherData.wind.speed}'</p>
  <p>Направление : '{windeg(weatherData.wind.deg)}'</p>
  <p>Атмосферное давление : '{aM(weatherData.main.grnd_level)} мм рт.ст'</p>
  <p>Влажность : '{weatherData.main.humidity}%'</p>
  <p>Время восхода солнца : {sunR(weatherData.sys.sunrise)}</p>
  <p>Время захода солнца : {sunS(weatherData.sys.sunset)}</p>
*/



export default App;

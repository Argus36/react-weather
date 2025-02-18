import { useState, useEffect } from "react";

const apiKey = 'a0f70c987f34020bed31937efb870a46';

function App() {

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, [lat, lon]);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      getWeatherData();
    }else {

    }
  }, [lat, lon]);

  const getWeatherData = async () => {
    try {
      const pos = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      const posw = await pos.json();
      setCity(posw[0].local_names.ru);

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=ru`);
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

function weatherDefinition(back_weather) {
  switch (back_weather) {
    case 'Clear':
      return (
        {background: `linear-gradient(170deg, rgb(252, 201, 24) 0%, #B6D5DD 40%, #D1FEFE 82%)`}
      );
      break;
    case 'Clouds':
      return (
        {background: `linear-gradient(170deg, #e2e2e2 23%, #C2CCD1 59%, #B6C9DD 100%)`}
      );
      break;
    case 'Drizzle' || 'Rain':
      return (
        {background: `linear-gradient(170deg, rgb(152, 231, 255) 0%, rgb(255, 255, 255) 40%, rgb(195, 241, 254) 80%)`}
      );
      break;
      case 'Thunderstorm':
      return (
        //{background: `linear-gradient(170deg, #1A103B 8%, #1B1434 27%, #1D192B 49%, #1A1727 57%, #0F0F10 84%)`}
        {background: `linear-gradient(170deg, #302E48 23%, #4B4A57 59%, #676767 100%)`}
      );
      break;
    case 'Snow':
      return (
        {background: `linear-gradient(170deg, #FFFFFF 40%,rgb(165, 165, 165) 80%`}
      );
      break;
    default:
      return (
        {background: `linear-gradient(170deg, #BCE7F4 5%, #82C8DD 17%, #F6AB79 37%, #818CD2 61%, #252F72 79%, #11194E 93%)`}
      )
      break;
  }
}

  return (
    <div className="App">
        {!weatherData ? (
          <div style={{background: `white`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`}} className="weater_container">
            <p style={{fontSize: `3vw`}}>Загрузка ...</p>
            <p style={{fontSize: `1vw`}}>(Если длится слишком долго возможно у вас отключена геолокация)</p>
          </div>
        ) : (
          <div style={weatherDefinition(weatherData.weather[0].main)}>
            <div className="weater_container">
              <div className="phone_border">
                <div className="phone">
                  <h1>Погода в <span style={{color: `white`, fontSize: `2vh`}}>г.</span>{city}</h1>
                  <img style={{width: `5vh`}} src={`./react-weather/Img/${weatherData.weather[0].icon}.png`}/>
                  <div className="topPhone">
  <p>base '{weatherData.weather[0].main}'</p>
  <p>Сама погода : '{String(weatherData.weather[0].description).charAt(0).toUpperCase() + String(weatherData.weather[0].description).slice(1)}'</p>
                  </div>
                  <div className="middlePhone">

                  </div>
                  <div className="footerPhone">

                  </div>
                </div>
              </div>
            </div>
            <div className="sun_container">
              <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, dignissimos unde corporis et ullam quam cum dicta vel possimus reiciendis illo voluptatibus sed saepe molestias tenetur esse facilis, nemo libero?</h1>
            </div>
          </div>
        )}
    </div>
  );
}

/*
  <p>Название города : '{city}'</p>
  <p>Фактическая температура : '{weatherData.main.temp}'</p>
  <p>Как ощущается '{weatherData.main.feels_like}'</p>
  <p>base '{weatherData.weather[0].main}'</p>
  <p>Сама погода : '{String(weatherData.weather[0].description).charAt(0).toUpperCase() + String(weatherData.weather[0].description).slice(1)}'</p>
  <p>Облачность : '{weatherData.clouds.all}%'</p>
  <p>Скорость ветра : '{weatherData.wind.speed}'</p>
  <p>Направление : '{windeg(weatherData.wind.deg)}'</p>
  <p>Атмосферное давление : '{aM(weatherData.main.grnd_level)} мм рт.ст'</p>
  <p>Влажность : '{weatherData.main.humidity}%'</p>
  <p>Время восхода солнца : {sunR(weatherData.sys.sunrise)}</p>
  <p>Время захода солнца : {sunS(weatherData.sys.sunset)}</p>
  <p>иконка : {weatherData.weather[0].icon}</p>
*/

//<p style={{position: `fixed`, top: `2.5%`, left: `0`}}>Широта : '{lat}'</p>
//<p style={{position: `fixed`, top: `5%`, left: `0`}}>Долгота : '{lon}'</p>

export default App;

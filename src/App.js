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


      const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=56&appid=${apiKey}&units=metric&lang=ru`);

      const data = await response.json();

      console.log(data);

      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  function windeg(num) {
    if (num <= 11) {
      return('С');
    }
    if (11 < num && num <= 33) {
      return('ССВ');
    }
    if (33 < num && num <= 56) {
      return('СВ');
    }
    if (56 < num && num < 78) {
      return('ВСВ');
    }
    if (78 <= num && num <= 101) {
      return('В');
    }
    if (101 < num && num <= 123) {
      return('ВЮВ');
    }
    if (123 < num && num <= 146) {
      return('ЮВ');
    }
    if (146 < num && num < 168) {
      return('ЮЮВ');
    }
    if (168 <= num && num <= 191) {
      return('ЮГ');
    }
    if (191 < num && num <= 213) {
      return('ЮЮЗ');
    }
    if (213 < num && num <= 236) {
      return('ЮЗ');
    }
    if (236 < num && num < 258) {
      return('ЗЮЗ');
    }
    if (258 <= num && num <= 281) {
      return('З');
    }
    if (281 < num && num <= 303) {
      return('ЗСЗ');
    }
    if (303 < num && num <= 326) {
      return('СЗ');
    }
    if (326 < num && num < 348) {
      return('ССЗ');
    }
    if (348 <= num && num <= 360) {
      return('С');
    }
  }

function mRS(gpa) {
  const mmRtSt = Math.round(gpa * 0.750064);
  return(mmRtSt);
}

function sun(date) {
  const god = new Date(date * 1000);
  if (god.getMinutes() < 10) {
    if (god.getHours() < 10) {
      return(`0${god.getHours()}:0${god.getMinutes()}`);
    } else {
      return(`${god.getHours()}:0${god.getMinutes()}`);
    }
  }else {
    if (god.getHours() < 10) {
      return (`0${god.getHours()}:${god.getMinutes()}`);
    }else {
      return (`${god.getHours()}:${god.getMinutes()}`);
    }
  }
}

function weatherDefinition(back_weather, icon, time) {
  if (time === 'n') {
    return (
      {background: `linear-gradient(190deg, rgba(6, 0, 56, 0.6) 10%,rgba(0, 5, 73, 0.73) 40%, rgba(10, 0, 65, 0.73) 80%)`}
    );
  }else {
    if (time === 'd') {
      return (
        {background: `linear-gradient(170deg, rgb(252, 201, 24) 0%, #B6D5DD 40%, #D1FEFE 82%)`}
      );
    }else {
      if (icon == '01n' || icon == '02n' || icon == '03n' || icon == '04n' || icon == '09n' || icon == '10n' || icon == '11n' || icon == '13n' || icon == '50n') {
        switch (back_weather) {
          case 'Clear':
            return (
              {background: `linear-gradient(160deg, rgba(10, 0, 65, 0.73) 0%,rgba(0, 5, 73, 0.73) 40%,rgba(6, 0, 56, 0.6) 82%)`}
            );
            break;
          case 'Clouds':
            return (
              {background: `linear-gradient(160deg, rgba(10, 0, 65, 0.73) 0%,rgba(0, 5, 73, 0.73) 40%,rgba(6, 0, 56, 0.6) 82%)`}
            );
            break;
          case 'Drizzle':
            return (
              {background: `linear-gradient(160deg, rgba(10, 0, 65, 0.73) 0%,rgba(0, 5, 73, 0.73) 40%,rgba(6, 0, 56, 0.6) 82%)`}
            );
            break;
          case 'Rain':
            return (
              {background: `linear-gradient(160deg, rgba(10, 0, 65, 0.73) 0%,rgba(0, 5, 73, 0.73) 40%,rgba(6, 0, 56, 0.6) 82%)`}
            );
            break;
          case 'Thunderstorm':
            return (
              //{background: `linear-gradient(170deg, #1A103B 8%, #1B1434 27%, #1D192B 49%, #1A1727 57%, #0F0F10 84%)`}
              {background: `linear-gradient(160deg, rgba(10, 0, 65, 0.73) 0%,rgba(0, 5, 73, 0.73) 40%,rgba(6, 0, 56, 0.6) 82%)`}
            );
            break;
          case 'Snow':
            return (
              {background: `linear-gradient(160deg, rgba(10, 0, 65, 0.73) 0%,rgba(0, 5, 73, 0.73) 40%,rgba(6, 0, 56, 0.6) 82%)`}
            );
            break;
          default:
            return (
              {background: `linear-gradient(160deg,rgb(96, 118, 124) 5%,rgb(63, 98, 109) 17%,rgb(102, 71, 50) 37%,rgb(70, 76, 114) 61%, #252F72 79%, #11194E 93%)`}
            )
            break;
        }
      }else {
        switch (back_weather) {
          case 'Clear':
            return (
              {background: `linear-gradient(10deg, rgb(252, 201, 24) 0%, #B6D5DD 40%, #D1FEFE 82%)`}
            );
            break;
          case 'Clouds':
            return (
              {background: `linear-gradient(170deg, #e2e2e2 23%, #C2CCD1 59%, #B6C9DD 100%)`}
            );
            break;
          case 'Drizzle':
            return (
              {background: `linear-gradient(170deg, rgb(152, 231, 255) 0%, rgb(255, 255, 255) 40%, rgb(195, 241, 254) 80%)`}
            );
          case 'Rain':
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
    }
  }
}

function mounth(day ,mounth) {
  switch (mounth) {
    case '01':
      return (`${day} Января`)
      break;

    case '02':
      return (`${day} Февраля`)
      break;

    case '03':
      return (`${day} Марта`)
      break;

    case '04':
      return (`${day} Апреля`)
      break;

    case '05':
      return (`${day} Мая`)
      break;

    case '06':
      return (`${day} Июня`)
      break;

    case '07':
      return (`${day} Июля`)
      break;

    case '08':
      return (`${day} Августа`)
      break;

    case '09':
      return (`${day} Сентября`)
      break;

    case '10':
      return (`${day} Октября`)
      break;

    case '11':
      return (`${day} Ноября`)
      break;

    case '12':
      return (`${day} Декабря`)
      break;

    default:
      return (`${mounth}`)
      break;
  }
}

function DayS(onedays) {
  let oneDays = Number(onedays);
  if (oneDays === 0) {
    let twoDays = 8;
    return twoDays;
  }else {
    let twoDays = Number(8 - (oneDays / 3));
    return twoDays;
  }
}

const day = 8;
const TOTD = 2;//times of the day


  return (
    <div className="App">
      <div className="srollChild">
        {!weatherData ? (
          <div style={{
            width: `100%`,
            height: `100vh`,
            background: `white`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`}}>
            <p style={{fontSize: `3vh`}}>Загрузка ...</p>
            <p style={{fontSize: `1.25vh`, fontWeight: `600`}}>(Если длится слишком долго возможно у вас отключена геолокация)</p>
          </div>
        ) : (
          <div style={weatherDefinition(weatherData.list[0].weather[0].main, weatherData.list[0].weather[0].icon)}>
            {console.log(weatherData.list[0].weather[0].main)}
            <div className="weater_container">
              <div className="phone_border">
                <div className="phone">
                  <h1>Погода в <span style={{color: `white`, fontSize: `2vh`}}>г.</span>{city}</h1>
                  <div className="topPhone">
                    <div className="top">
                      <h1 style={{fontSize: '2.25vh'}}>Сегодня</h1>
                      <h1>
                        {String(weatherData.list[0].weather[0].description).charAt(0).toUpperCase() + String(weatherData.list[0].weather[0].description).slice(1)}
                        <img style={{marginLeft: `1vh`}} src={`/react-weather/Img/${weatherData.list[0].weather[0].icon}.png`}/>
                      </h1>
                    </div>
                    <div className="temp">
                      <p style={{fontWeight: '650'}}>{weatherData.list[0].main.temp} C&deg;</p>
                      <p style={{textAlign: `end`}}>Ощущается как <span style={{color: 'white', fontWeight: '650'}}>&ensp;{weatherData.list[0].main.feels_like}&nbsp;</span> C&deg;</p>
                    </div>
                    <div className="info_1">
                      <p>Облачность : {weatherData.list[0].clouds.all}%</p>
                      <p>{mRS(weatherData.list[0].main.grnd_level)} мм рт.ст</p>
                    </div>
                    <div className="info_2">
                      <p><img style={{marginRight: '1vh'}} src='/react-weather/Img/wind.png'/> {weatherData.list[0].wind.speed} м/с</p>
                      <p>{windeg(weatherData.list[0].wind.deg)} <img style={{marginLeft: '1vh'}} src="/react-weather/Img/compass.png" /></p>
                      <p>{weatherData.list[0].main.humidity} <img style={{marginLeft: `0.5vh`}} src={`/react-weather/Img/humidity.png`}/></p>
                    </div>
                  </div>

                  <div className="weatherday">
                    <div className="top">
                      <h1>{mounth(`${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`)].dt_txt.slice(8, -8)}`, `${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`)].dt_txt.slice(5, -12)}`)}</h1>
                      <h2>Давление,<br/>
                        мм рт. ст.
                      </h2>
                      <h2>Влажность</h2>
                      <h2>Ветер, м/с</h2>
                      <h2>Ощущается как</h2>
                    </div>
                    <div className="morning container">
                      <div>
                        <h2>Утром</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2].main.feels_like}C&deg;</h2>
                    </div>
                    <div className="afternoon container">
                      <div>
                        <h2>Днём</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4].main.feels_like}C&deg;</h2>
                    </div>
                    <div className="evening container">
                      <div>
                        <h2>Вечером</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6].main.feels_like}C&deg;</h2>
                    </div>
                    <div className="night container">
                      <div>
                        <h2>Ночью</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8].main.feels_like}C&deg;</h2>
                    </div>
                  </div>

                  <div className="weatherday">
                    <div className="top">
                      <h1>{mounth(`${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8].dt_txt.slice(8, -8)}`, `${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8].dt_txt.slice(5, -12)}`)}</h1>
                      <h2>Давление,<br/>
                        мм рт. ст.
                      </h2>
                      <h2>Влажность</h2>
                      <h2>Ветер, м/с</h2>
                      <h2>Ощущается как</h2>
                    </div>
                    <div className="morning container">
                      <div>
                        <h2>Утром</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (2 + 8)].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (2 + 8)].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (2 + 8)].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (2 + 8)].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (2 + 8)].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (2 + 8)].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (2 + 8)].main.feels_like}C&deg;</h2>
                    </div>
                    <div className="afternoon container">
                      <div>
                        <h2>Днём</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (4 + 8)].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (4 + 8)].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (4 + 8)].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (4 + 8)].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (4 + 8)].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (4 + 8)].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (4 + 8)].main.feels_like}C&deg;</h2>
                    </div>
                    <div className="evening container">
                      <div>
                        <h2>Вечером</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (6 + 8)].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (6 + 8)].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (6 + 8)].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (6 + 8)].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (6 + 8)].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (6 + 8)].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (6 + 8)].main.feels_like}C&deg;</h2>
                    </div>
                    <div className="night container">
                      <div>
                        <h2>Ночью</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (8 + 8)].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (8 + 8)].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (8 + 8)].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (8 + 8)].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (8 + 8)].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (8 + 8)].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (8 + 8)].main.feels_like}C&deg;</h2>
                    </div>
                  </div>

                  <div className="weatherday">
                    <div className="top">
                      <h1>{mounth(`${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (8 * 2)].dt_txt.slice(8, -8)}`, `${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (8 * 2)].dt_txt.slice(5, -12)}`)}</h1>
                      <h2>Давление,<br/>
                        мм рт. ст.
                      </h2>
                      <h2>Влажность</h2>
                      <h2>Ветер, м/с</h2>
                      <h2>Ощущается как</h2>
                    </div>
                    <div className="morning container">
                      <div>
                        <h2>Утром</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2 + (8 * 2)].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2 + (8 * 2)].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2 + (8 * 2)].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2 + (8 * 2)].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2 + (8 * 2)].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (2 + 8)].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2 + (8 * 2)].main.feels_like}C&deg;</h2>
                    </div>
                    <div className="afternoon container">
                      <div>
                        <h2>Днём</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4 + (8 * 2)].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4 + (8 * 2)].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4 + (8 * 2)].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4 + (8 * 2)].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4 + (8 * 2)].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (4 + 8)].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4 + (8 * 2)].main.feels_like}C&deg;</h2>
                    </div>
                    <div className="evening container">
                      <div>
                        <h2>Вечером</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6 + (8 * 2)].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6 + (8 * 2)].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6 + (8 * 2)].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6 + (8 * 2)].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6 + (8 * 2)].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (6 + 8)].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6 + (8 * 2)].main.feels_like}C&deg;</h2>
                    </div>
                    <div className="night container">
                      <div>
                        <h2>Ночью</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8 + (8 * 2)].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8 + (8 * 2)].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8 + (8 * 2)].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8 + (8 * 2)].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8 + (8 * 2)].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (8 + 8)].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 8 + (8 * 2)].main.feels_like}C&deg;</h2>
                    </div>
                  </div>

                  <div className="weatherday">
                    <div className="top">
                      <h1>{mounth(`${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (8 * 3)].dt_txt.slice(8, -8)}`, `${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (8 * 3)].dt_txt.slice(5, -12)}`)}</h1>
                      <h2>Давление,<br/>
                        мм рт. ст.
                      </h2>
                      <h2>Влажность</h2>
                      <h2>Ветер, м/с</h2>
                      <h2>Ощущается как</h2>
                    </div>
                    <div className="morning container">
                      <div>
                        <h2>Утром</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2 + (8 * 3)].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2 + (8 * 3)].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2 + (8 * 3)].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2 + (8 * 3)].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2 + (8 * 3)].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (2 + 8)].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 2 + (8 * 3)].main.feels_like}C&deg;</h2>
                    </div>
                    <div className="afternoon container">
                      <div>
                        <h2>Днём</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4 + (8 * 3)].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4 + (8 * 3)].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4 + (8 * 3)].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4 + (8 * 3)].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4 + (8 * 3)].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (4 + 8)].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 4 + (8 * 3)].main.feels_like}C&deg;</h2>
                    </div>
                    <div className="evening container">
                      <div>
                        <h2>Вечером</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6 + (8 * 3)].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6 + (8 * 3)].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6 + (8 * 3)].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6 + (8 * 3)].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6 + (8 * 3)].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (6 + 8)].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 6 + (8 * 3)].main.feels_like}C&deg;</h2>
                    </div>
                    <div className="night container">
                      <div>
                        <h2>Ночью</h2>
                        <h1>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 7 + (8 * 3)].main.temp}C&deg;</h1>
                      </div>
                      <img src={`/react-weather/Img/${weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 7 + (8 * 3)].weather[0].icon}.png`}/>
                      <h2>{mRS(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 7 + (8 * 3)].main.grnd_level)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 7 + (8 * 3)].main.humidity}%</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 7 + (8 * 3)].wind.speed} {windeg(weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + (8 + 8)].wind.deg)}</h2>
                      <h2>{weatherData.list[DayS(`${weatherData.list[0].dt_txt.slice(10, -6)}`) + 7 + (8 * 3)].main.feels_like}C&deg;</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {!weatherData ? (
        <div></div>
      ) : (
        <div className="sun srollChild" style={weatherDefinition(weatherData.list[0].weather[0].main, weatherData.list[0].weather[0].icon, weatherData.list[0].sys.pod)}>
          <div className="container">
            <div className="block">
              <div className="arc">
                <img style={{width: `35vh`}} src={`/react-weather/Img/arc.png`} />
              </div>
              <div className="suns">
                <div className="sune">
                  <img src={`/react-weather/Img/sunrise.png`}/>
                  <h1>{(sun(weatherData.city.sunrise))}</h1>
                </div>
                <div style={{width: `19.5vh`}}></div>
                <div className="sune">
                  <img src={`/react-weather/Img/sunset.png`} />
                  <h1>{(sun(weatherData.city.sunset))}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/*
  <p>Время восхода солнца : {sunR(weatherData.sys.sunrise)}</p>
  <p>Время захода солнца : {sunS(weatherData.sys.sunset)}</p>
*/

//<p style={{position: `fixed`, top: `2.5%`, left: `0`}}>Широта : '{lat}'</p>
//<p style={{position: `fixed`, top: `5%`, left: `0`}}>Долгота : '{lon}'</p>

export default App;

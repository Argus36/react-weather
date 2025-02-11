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



  return (
    <div className="App">
      <div className="container">
        {weatherData ? (
          <div>
            <p>Широта : '{lat}'</p>
            <p>Долгота : '{lon}'</p>
            <p>Название города : '{weatherData.name}'</p>
            <p>Фактическая температура : '{weatherData.main.temp}'</p>
            <p>Как ощущается '{weatherData.main.feels_like}'</p>
            <p>Сама погода : '{weatherData.weather[0].description}'</p>
            <p>Скорость ветра : '{weatherData.wind.speed}'</p>
            <p>Направление : '{windeg(weatherData.wind.deg)}'</p>
          </div>
        ) : (
          <p>Загрузка ...</p>
        )}
      </div>
    </div>
  );
}

export default App;

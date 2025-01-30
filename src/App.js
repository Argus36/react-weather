import moment from "moment";
import { useState, useEffect } from "react";




function App() {

  const [date, setDate] = useState(moment().format("dddd DD MMMM YYYY"));
  const [time, setTime] = useState(moment().format("HH mm ss"));


  useEffect(() => {
    const interval = setInterval(() => {
      setDate(moment().format("dddd DD MMMM YYYY"));
      setTime(moment().format("HH:mm:ss"));
    }, 500);
    return () => clearInterval(interval)
  }, []);





  return (
    <div className="App">
      <h1>Сегодняшняя дата — {date}</h1>
      <h1>Время — {time}</h1>
    </div>
  );
}


export default App;

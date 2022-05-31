import { useState, useEffect} from "react";
import axios from "axios";
import "./index.css";
import WeatherToday from "./components/weatherToday";


const App = () => {
  //Weather data state
  const [weather, setWeather] = useState();
  const [today, setToday] = useState([]);
  const [forecastWeek, setForecastWeek] = useState();
  const [forecastMonth, setForecastMonth] = useState();
  const [country, setCountry] = useState("Srinagar");

  // Switch today/5/16 state
  const [showToday, setShowToday] = useState(true);
  const [showWeek, setShowWeek] = useState(false);
  const [showMonth, setShowMonth] = useState(false);

  //border style state
  const [todayBdr, setTodayBdr] = useState("border");
  const [weekBdr, setWeekBdr] = useState("");
  const [monthBdr, setMonthBdr] = useState("");

  const todayBtn = (e) => {
    setShowToday(true);
    setShowWeek(false);
    setShowMonth(false);
  };
  const weekBtn = (e) => {
    setShowToday(false);
    setShowWeek(true);
    setShowMonth(false);
  };
  const monthBtn = (e) => {
    setShowToday(false);
    setShowWeek(false);
    setShowMonth(true);
  };
  
  let weatherWeek = [];
  const date = new Date().toString().substring(0, 15);
  const searchHandler = async (e) => {
    try {
      e.preventDefault();

      if(country === "") alert('Write something, will ya bruh!')
      else{
        
      const resMonth = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${country}&units=metric&cnt=16&appid=${process.env.REACT_APP_KEY}`);
      setForecastMonth(resMonth.data.list);

      //Day
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.REACT_APP_KEY}&units=metric`);
      // console.log(res.data, 'res')
      setWeather(res.data);

      //5 Days
      const resWeek = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${process.env.REACT_APP_KEY}&units=metric`);
      
      setForecastWeek(resWeek.data.list);
      resWeek.data.list.map((l) => weatherWeek.push(l));
     

      //3 hour forecasts for current day , resWeek returns objects with 3 hour forecasts
      setToday(weatherWeek.splice(0, 5)); //store first 5 objects as they contain 3 hour forecasts for today
      }
      

      
    } catch (error) {
      window.alert(error.toString())
    }
  };
  useEffect(()=>{
    const firstRender = async() => {
      try {
        if(country === "") alert('Write something, will ya bruh!')
        else{
          
        const resMonth = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${country}&units=metric&cnt=16&appid=${process.env.REACT_APP_KEY}`);
        setForecastMonth(resMonth.data.list);
  
        //Day
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.REACT_APP_KEY}&units=metric`);
        // console.log(res.data, 'res')
        setWeather(res.data);
  
        //5 Days
        const resWeek = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${process.env.REACT_APP_KEY}&units=metric`);
        
        setForecastWeek(resWeek.data.list);
        resWeek.data.list.map((l) => weatherWeek.push(l));
       
  
        //3 hour forecasts for current day , resWeek returns objects with 3 hour forecasts
        setToday(weatherWeek.splice(0, 5)); //store first 5 objects as they contain 3 hour forecasts for today
        }
        
  
        
      } catch (error) {
        window.alert(error.toString())
      }
    }
    firstRender();
  },[])
  const inputHandler = (e) => {
    setCountry(e.target.value);
  };

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let newdate = new Date().getDay();

  return (
    <>
      <div className="container  sm:flex main-weather m-auto w-4/5 mt-12 h-auto shadow-lg lg:w-3/5">
        <div className="left text-white sm:left flex-col w-3/5 rounded-tl-xl rounded-bl-xl">
          {/* LEFT SECTION */}
          <h1 className="text-sm bold m-5 ">{date}</h1>

          <form onSubmit={searchHandler} className="">
            <input
              onChange={inputHandler}
              value = {country || ""}
              className="border shadow-md rounded-md block m-auto mb-3 text-black text-center"
            />
            <button
              className="search-btn m-auto bg-blue-500 rounded-full py-2 px-4 block text-center hover:translate-y-0.5"
              type="submit"
            >
              Search
            </button>
          </form>
          {weather ? (
            <div className="weather  sm:mt-52 pt-24 pl-7 ">
              <h1 className="temp-L text-5xl">{weather.main.temp.toFixed(1)}&deg;C</h1>{" "}
              <p className="city sm:mb-11 pl-3">{weather.name}</p>
            </div>
          ) : (
            <p>loading</p>
          )}
        </div>

        <div className="right w-full rounded-tr-xl rounded-br-xl bg-white">
          {/* RIGHT SECTION */}
          <h1 className=" text-2xl text-gray-400 pt-8 pl-12 pb-3 ">Forecast</h1>
          <hr className="forecast-hr"/>
          {forecastMonth ? (
            <div className="forecast-head flex text-center text-gray-400 p-5 pl-8 mr-3 justify-between">
              {forecastMonth ? (
                forecastMonth.slice(0, 4).map((fc, i) => (
                  <ul className="icons " key={i}>
                    <li>
                      {
                        <img
                          alt="icon"
                          src={`http://openweathermap.org/img/wn/${fc.weather[0].icon}@2x.png`}
                        />
                      }
                      <span className="">{weekdays[newdate++]}</span>
                    </li>
                  </ul>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ) : (
            <p>loading</p>
          )}

          <div className="buttons p-6 sm:pl-14 ">
            
            <button
              className="Btn today-btn font-semibold mr-8 hover:text-orange-800 "
              id={todayBdr}
              onClick={todayBtn}
            >
              Today
            </button>
            <button
              className="Btn week-btn {border} font-semibold mr-8 hover:text-orange-800"
              id={weekBdr}
              onClick={weekBtn}
            >
              Week
            </button>
            <button
              className="Btn month-btn {border} font-semibold mr-3 hover:text-orange-800 "
              id={monthBdr}
              onClick={monthBtn}
            >
              Month
            </button>
            <hr className="btn-hr" />
          </div>

          {forecastWeek ? (
            <WeatherToday
              today={today}
              forecastWeek={forecastWeek}
              forecastMonth={forecastMonth}
              showToday={showToday}
              showWeek={showWeek}
              showMonth={showMonth}
              setTodayBdr={setTodayBdr}
              setWeekBdr={setWeekBdr}
              setMonthBdr={setMonthBdr}
            />
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </>
  );
};
export default App;

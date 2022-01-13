

const WeatherToday = ({
  today,
  showWeek,
  showToday,
  showMonth,
  forecastMonth,
  setMonthBdr,
  setWeekBdr,
  setTodayBdr,
}) => {
  
  let newdate = new Date().getDay();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //DAY WEATHER
  if (showToday) {
    setTimeout(() => {
      setTodayBdr("border");
      setWeekBdr("");
      setMonthBdr("");
    }, 0);
    return (
      <div className="weather-today">
        <ul className="weather-ul m-3 max-h-80">
          {today ? (
            today.map((l, i) => (
              <li
                key={i}
                className="mb-5 flex justify-around "
              >
                <span className="time">
                  {`${l.dt_txt}`
                    .toString()
                    .replace(`${l.dt_txt.substr(0, 10)}`, "")
                    .replace(":00", "")}{" "}
                </span>
                <span className="desc ml-12"> {l.weather[0].description} </span>
                <span className="temp ml-12 text-teal-800">
                  {l.main.temp.toFixed(1)}&deg;
                </span>
              </li>
            ))
          ) : (
            <p>loading</p>
          )}
        </ul>
      </div>
    );
  } else if (showWeek) {
    //WEEK WEATHER
    setTimeout(() => {
      setTodayBdr("");
      setWeekBdr("border");
      setMonthBdr("");
    }, 0);

    return (
      //WEEK
      <div className="weather-week">
        <ul className="m-3 max-h-80">
          {forecastMonth ? (
            forecastMonth.slice(0, 5).map((l, i) => (
              <li key={i} className=" mb-1 flex justify-around p-1 ">
                {/* day */}
                <span className="day p-1">
                  {weekdays[newdate >= 7 ? (newdate = 0) : newdate++]}
                </span>

                {/* time */}
                {/* {`${l.dt_txt}`
                  .toString()
                  .replace(`${l.dt_txt.substr(0, 10)}`, "")
                  .replace(":00", "")}{" "} */}

                {/* weather */}
                {/* {l.weather[0].description} {l.main.temp} */}

                <span className="desc-month ml-12"> {l.weather[0].description}</span>
                <span className="temp-month ml-12 text-teal-800">{l.temp.day.toFixed(1)}&deg;</span>
              </li>
            ))
          ) : (
            <p>loading</p>
          )}
        </ul>
      </div>

      //16days
    );
  } else if (showMonth) {
    //16 DAYS WEATHER
    setTimeout(() => {
      setTodayBdr("");
      setWeekBdr("");
      setMonthBdr("border");
    });

    return (
      //Month
      <div className="weather-month-container">
        <ul className="weather-month overflow-y-scroll max-h-60 pt-2 ">
          {forecastMonth ? (
            forecastMonth.map((l,i) => (
              <li key={i} className="mb-3 flex justify-between p-1 sm:pl-14 pr-4">
                <span className="day">
                  {weekdays[newdate > 6 ? (newdate = 0) : newdate++]}
                </span>
                <span className="desc-month ml-12"> {l.weather[0].description}</span>
                <span className="temp-month ml-12 text-teal-800">{l.temp.day.toFixed(1)}&deg;</span>
              </li>
            ))
          ) : (
            <p>loading</p>
          )}
        </ul>
      </div>
    );
  } else {
    return (
      <>
        <h1>Search for a city</h1>
      </>
    );
  }
};

export default WeatherToday;

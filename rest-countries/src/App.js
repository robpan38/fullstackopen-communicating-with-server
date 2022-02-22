import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const StateWeather = ({ name, weather }) => {
  if (weather === null) return <></>;

  return (
    <>
      <h1>Weather in {name}</h1>
      <p>temperature {weather["main"]["temp"]} celsius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather["weather"][0]["icon"]}@2x.png`}
      />
      <p style={{ marginBottom: "30px" }}>
        wind {weather["wind"]["speed"]} m/s
      </p>
    </>
  );
};

const State = ({ state }) => {
  let languageKeys = Object.keys(state.languages);
  let languages = languageKeys.map(
    (languageKey) => state.languages[languageKey]
  );

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${state.name.common}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  });

  return (
    <div>
      <h1 style={{ marginTop: "30px" }}>{state.name.common}</h1> <br />
      <p>capital: {state.capital[0]}</p>
      <p>area: {state.area}</p> <br />
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <br />
      <img style={{ marginBottom: "30px" }} src={state.flags["png"]} />
      <StateWeather name={state.name.common} weather={weather} />
    </div>
  );
};

const StatesList = ({ states }) => {
  const [stateShow, setStateShow] = useState(
    new Array(states.length).fill(false)
  );

  return (
    <ul>
      {states.map((state, index) => (
        <div key={state.name.common}>
          {state.name.common}
          <button
            onClick={() => {
              let newArray = [...stateShow];
              newArray[index] = !newArray[index];
              setStateShow(newArray);
            }}
          >
            show
          </button>
          {stateShow[index] ? <State state={state} /> : ""}
        </div>
      ))}
    </ul>
  );
};

const States = ({ states }) => {
  if (states.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (states.length === 1) {
    return <State state={states[0]} />;
  } else if (states.length > 1) {
    return <StatesList states={states} />;
  } else return <></>;
};

function App() {
  const [states, setStates] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const states = response.data;
      setStates(states);
    });
  }, []);

  const filteredStates = states.filter((state) => {
    return (
      state.name.common.toLowerCase().includes(query.toLowerCase()) &&
      query !== ""
    );
  });

  const handleNewQuery = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <div>
        Type query: <input value={query} onChange={handleNewQuery} />
      </div>
      <States states={filteredStates} />
    </div>
  );
}

export default App;

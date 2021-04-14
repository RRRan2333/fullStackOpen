import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetail = ({match, weather, setWeather}) => <>
  <h1>{match.name}</h1>
  <p>capital {match.capital}</p>
  <p>population {match.population}</p>
  <h2>languages</h2>
  <ul>
    {match.languages.map(lang => <li key={lang.iso639_2}>{lang.name}</li>)}
  </ul>
  <img src={match.flag} style={{width: 250}} alt="something?"/>
  <CapitalWeather match={match} weather={weather} setWeather={setWeather}/>
</>

const DisplayResults = ({searchCountry, handleShow, countries, weather, setWeather}) => {
  if (searchCountry !== '') {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchCountry.toLowerCase()))
    
    if (filteredCountries.length > 10) {
      return <p>Too many matches, please specify</p>
    } else if (filteredCountries.length > 1) {
      return(
        filteredCountries
          .map(country => <p key={country.alpha3Code}>{country.name}
            <button key={country.alpha3Code} 
            onClick={() => handleShow(country.name)}>show</button>
          </p>)
      )
    } else if (filteredCountries.length === 1) {
      return <CountryDetail match={filteredCountries[0]} 
        weather={weather} setWeather={setWeather}/>
    } else {
      return <p>no match found</p>
    }
  } else {
    return <p>waiting for your search term</p>
  }
}

const CapitalWeather = ({match, weather, setWeather}) => {
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    console.log('weather effect')
    console.log(match.capital)
    const params = {
      access_key: api_key,
      query: match.capital
    }
    console.log(params)
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        console.log('weather promise fulfilled')
        console.log("var weather: ", weather)
        console.log("API temp: ", response.data.current.temperature)
        setWeather(response.data.current.temperature)
        console.log("var weather: ", weather)
      })
  }, [])

  return (
    <>
      <h2>Weather in {match.capital}</h2>
      <h4>temperature: {weather}</h4>
      {/* <img src={response.data.current.weather_icons} 
      style={{width: 50}} alt="weather icon"/>
       */}
    </>
  )
}

const App = () => {
  const [ searchCountry, setSearchCountry ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ weather, setWeather ] = useState(99)

  const handleSearchChange = (event) => {
    setSearchCountry(event.target.value)
  }
  const handleShow = (country) => {
    console.log('handleShow triggered, value is ', country)
    setSearchCountry(country)
  }

  useEffect(() => {
    console.log('country effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('country promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <h4>Hello world</h4>
      <h4>find countries 
        <input value={searchCountry} onChange={handleSearchChange}/>
      </h4>
      <DisplayResults searchCountry={searchCountry} handleShow={handleShow} countries={countries} 
      weather={weather} setWeather={setWeather}/>
    </div>
  )
}

export default App
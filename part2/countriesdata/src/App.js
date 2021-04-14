import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetail = ({match}) => <>
  <h1>{match.name}</h1>
  <p>capital {match.capital}</p>
  <p>population {match.population}</p>
  <ul>
    {match.languages.map(lang => <li key={lang.iso639_2}>{lang.name}</li>)}
  </ul>
  <img src={match.flag} style={{width: 250}} />

</>

const DisplayResults = ({searchCountry, countries}) => {
  if (searchCountry !== '') {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchCountry.toLowerCase()))
    
    if (filteredCountries.length > 10) {
      return <p>Too many matches, please specify</p>
    } else if (filteredCountries.length > 1) {
      return(
        filteredCountries
          .map(country => <p key={country.alpha3Code}>{country.name}</p>)
      )
    } else if (filteredCountries.length === 1) {
      return <CountryDetail match={filteredCountries[0]}/>
    } else {
      return <p>no match found</p>
    }
  } else {
    return <p>waiting for your search term</p>
  }
}

const App = () => {
  const [ searchCountry, setSearchName ] = useState('swi')
  const [ countries, setCountries ] = useState([])

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
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
      <DisplayResults searchCountry={searchCountry} countries={countries}/>
    </div>
  )
}

export default App
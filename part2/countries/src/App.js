import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [URL, setURL] = useState('')
  const [weather, setWeather] = useState(null)

  const access_key = '' // ACCESS KEY GOES HERE

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log(response)
      })
  }, [])

  useEffect(() => {
    axios
      .get(URL)
      .then(response => {
        if (URL !== '') {
          setWeather(response.data)
        }
      })
  }, [URL])

  const handleSearchChange = (event) => setSearch(event.target.value)
  const handleCountrySelect = (country) => setSearch(country.name)
  const handleURLChange = (country) => setURL(`http://api.weatherstack.com/current?access_key=${access_key}&query=${country.capital}`)

  return (
    <div>

      <Search
        searchValue={search}
        handleSearchChange={handleSearchChange}
      />

      <Countries
        countries={countries}
        search={search}
        handleCountrySelect={handleCountrySelect}
        handleURLChange={handleURLChange}
        weather={weather}
      />

    </div>
  )
}

export default App
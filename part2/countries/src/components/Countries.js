import React from 'react'

const Countries = ({ countries, search, handleCountrySelect, handleURLChange, weather }) => {
    const countriesToShow = (search === '')
        ? []
        : countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

    if (countriesToShow.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    }

    if (countriesToShow.length === 1) {
        handleURLChange(countriesToShow[0])
        return (<CountryStats country={countriesToShow[0]} weather={weather} />)
    } else {
        return (
            countriesToShow.map(country => {
                    return (
                        <div key={country.name}>
                            <span>{country.name} </span>
                            <button onClick={() => handleCountrySelect(country)}>show</button>
                        </div>
                    )
                }
            )
        )
    }
}

const CountryStats = ({ country, weather }) => {
    return (
        <div>
            <h1>{country.name}</h1>

            <div>capital {country.capital}</div>
            <div>population {country.population}</div>

            <h2>languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>

            <img src={country.flag} height="150" width="auto" alt="country flag"></img>

            <h2>Weather in {country.capital}</h2>

            {weather &&
                <div>
                    <div><strong>temperature:</strong> {weather.current.temperature} Celsius</div>
                    <img src={weather.current.weather_icons} height="150" width="auto" alt="country flag"></img>
                    <div><strong>wind:</strong> {weather.current.wind_speed} kph direction {weather.current.wind_dir}</div>
                </div>
            }
        </div>
    )
}

export default Countries
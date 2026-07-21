import { useEffect, useState } from 'react'
import CountryList from './components/CountryList'
import SearchForm from './components/SearchForm'
import countryService from './services/countries'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(countryData => {
        setCountries(countryData)
      })
      .catch(error => {
        console.error('Error fetching country data:', error)
        setErrorMessage('Could not load country information')
      })
  }, [])

  const handleSearchChange = event => {
    setSearchValue(event.target.value)
  }

  const handleShowCountry = countryName => {
    setSearchValue(countryName)
  }

  const normalizedSearchValue = searchValue.trim().toLowerCase()

  const countriesToShow = normalizedSearchValue
    ? countries.filter(country =>
        country.name.common
          .toLowerCase()
          .includes(normalizedSearchValue)
      )
    : []

  return (
    <div>
      <SearchForm
        value={searchValue}
        onChange={handleSearchChange}
      />

      {errorMessage && <p>{errorMessage}</p>}

      <CountryList
        countries={countriesToShow}
        onShowCountry={handleShowCountry}
      />
    </div>
  )
}

export default App
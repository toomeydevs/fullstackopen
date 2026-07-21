import CountryDetails from './CountryDetails'

const CountryList = ({ countries, onShowCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}{' '}

            <button
              type="button"
              onClick={() => onShowCountry(country.name.common)}
            >
              show
            </button>
          </li>
        ))}
      </ul>
    )
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }

  return null
}

export default CountryList
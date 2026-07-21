import Weather from './Weather'

const CountryDetails = ({ country }) => {
  const capital = country.capital?.[0] ?? null
  const languages = Object.values(country.languages ?? {})

  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>capital {capital ?? 'N/A'}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>

      {languages.length > 0 ? (
        <ul>
          {languages.map(language => (
            <li key={language}>
              {language}
            </li>
          ))}
        </ul>
      ) : (
        <p>No language information available</p>
      )}

      {country.flags?.png && (
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          width="150"
        />
      )}

      {capital && <Weather capital={capital} />}
    </div>
  )
}

export default CountryDetails
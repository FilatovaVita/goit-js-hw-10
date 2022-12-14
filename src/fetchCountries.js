const BASE_URL = 'https://restcountries.com/v2';

function fetchCountries(name) {
  return fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(Response => Response.json());
}

export default { fetchCountries };

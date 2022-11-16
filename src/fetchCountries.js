const BASE_URL = `https://restcountries.com/v3.1`;
const options = {
    "flags": 
    "https://restcountries.com/data/col.svg",
    "capital":``,
    "population": ``,
    "languages":[],
    "nativeName":``
}
function fetchCountries() {
return fetch(`${BASE_URL}/name/{name}`,options)
.then(Response => {
    return Response.json();
})}

export default {fetchCountries};
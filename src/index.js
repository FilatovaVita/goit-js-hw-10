import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 300;

const refs = {
  countryCard: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
  searchForm: document.querySelector('#search-box'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const searchName = refs.searchForm.value.trim();

  if (searchName === '') {
    refs.countryCard.innerHTML = '';
    refs.countryList.innerHTML = '';
  }

  API.fetchCountries(searchName)
    .then(countries => {
      if (countries.length === 1) {
        refs.countryList.innerHTML = '';
        return renderCountryCard(countries);
      } else if (countries.length >= 10) {
        return onManyMatch();
      } else {
        refs.countryCard.innerHTML = '';
        return renderCountryList(countries);
      }
    })
    .catch(onFetchError);
}

function renderCountryCard(arr) {
  const markup = arr
    .map(
      item =>
        `<div class="card-img">
    <img src=${item.flags.svg} alt=${item.name}/>
    <h1 class="card-title">${item.name}</h1>
</div>
<div class="card-body">
    <p class="card-text"><span>Capital:</span>${item.capital}</p>
    <p class="card-text"><span>Population:</span>${item.population}</p>
    <p class="card-text"><span>Languages:</span>${item.languages
      .map(({ name }) => `${name}`)
      .join(',')}</p>
</div>`
    )
    .join('');
  refs.countryCard.innerHTML = markup;
}
function renderCountryList(arr) {
  const markup = arr
    .map(
      item => `<div class="card-img">
    <img src=${item.flags.svg} alt=${item.name}/>
    <h1 class="card-title">${item.name}</h1>
</div>`
    )
    .join('');
  refs.countryList.innerHTML = markup;
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
}
function onManyMatch() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

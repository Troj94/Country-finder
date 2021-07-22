import './sass/main.scss';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countryTempl from './templates/countryInfo';
import countriesListTempl from './templates/countriesList';
// import fetchCountries from "./js/fetchCountries";

async function fetchCountries(countryName) {
    const options = new URLSearchParams({
    fields: 'name;capital;population;flag;languages;currencies',
  });
    const fetchCountries = fetch(`https://restcountries.eu/rest/v2/name/${countryName}?${options}`);
    const response = await fetchCountries;
    if (!response.ok) {
        throw new Error(response.status);
    }
    return await response.json();
}

const DEBOUNCE_DELAY = 300;
const inputBox = document.querySelector("#search-box");
const countryInfo = document.querySelector(".country-info");
const countriesList = document.querySelector(".country-list");

inputBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
    e.preventDefault();
    const countryName = e.target.value.trim();

    if (countryName.length === 0) {
        clearCountries();
        return;
    }

    fetchCountries(countryName)
        .then(data => {
            if (data.length === 1) {
                clearCountries();
                countryInfo.innerHTML = countryTempl(data);
            }
            return data;
        })
        .then(data => {
            if (data.length > 1 && data.length <= 10) {
                clearCountries();
                countriesList.innerHTML = countriesListTempl(data);
            }
            return data;
        })
        .then(data => {
            if (data.length > 10) {
            clearCountries();
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
        })
        .catch(err => {
            clearCountries();
            Notiflix.Notify.failure('Oops, there is no country with that name');
        });
}

function clearCountries() {

    countryInfo.innerHTML = "";
    countriesList.innerHTML = "";
}

Notiflix.Notify.init({
  position: 'center-top',
  distance: '50px',
  fontSize: '22px',
  width: '500px',
});
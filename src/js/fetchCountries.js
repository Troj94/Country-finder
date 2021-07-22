// export default function fetchCountries(countryName) {
//     const options = new URLSearchParams({
//     fields: 'name;capital;population;flag;languages;currencies',
//   });
//     const fetchCountries = fetch(`https://restcountries.eu/rest/v2/name/${countryName}?${options}`);
//     return fetchCountries.then(response => {
//         if (!response.ok) {
//             throw new Error(response.status);
//         }
//         return response.json();
//     });
// }
const regionOptions = document.querySelector(".region-options");
const filterArea = document.getElementById("filter-area");
const allCountryCards = document.getElementById("country-cards");

filterArea.addEventListener("click", () => {
  regionOptions.classList.toggle("region-options-open");
});

//Required to close the options section that opens when clicking outside the filtering area
document.addEventListener("click", (event) => {
  if (!event.target.closest("#filter-area")) {
    regionOptions.classList.remove("region-options-open");
  }
});

let countryCards = [];

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    countryCards = data;
    countryCards.forEach((country) => {
      console.log(country);
      allCountryCards.innerHTML += `<div class="country-card">
    <div class="country-flag-container">
    <img class"country-flag" src=${country.flags.svg}>
    </div>

    <div class="country-infos">
    <h3 class="country-name">${country.name.common}</h3>
    <span><strong>
    Population: 
    </strong>${country.population}</span> 
    <br>
    <span><strong>
    Region: 
    </strong>${country.region}</span> 
    <br>
    <span><strong>
    Capital: 
    </strong>${country.capital}</span> 
    </div>
  
    </div>`;
    });
  });

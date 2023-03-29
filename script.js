const regionOptions = document.querySelector(".region-options");
const filterArea = document.getElementById("filter-area");
const allCountryCards = document.getElementById("country-cards");
const loading = document.querySelector(".loader-container");

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

//Required to load data from API with GET method
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    countryCards = data;
    loading.style.display = "none";
    allCountryCards.innerHTML = countryCards
      .map((country) => {
        return `<div class="country-card">
    <div class="country-flag-container">
   <img class="country-flag" src=${country.flags.svg}>
    </div>

  <div class="country-infos">
    <h3 class="country-name">${country.name.common}</h3>
    <div class="country-info-row">
        <strong>Population:</strong>
  <span>${country.population.toLocaleString()}</span>
    </div>
    <div class="country-info-row">
        <strong>Region:</strong>
        <span>${country.region}</span>
    </div>
     <div class="country-info-row">
<strong>Capital:</strong> ${country.capital}  </div>
</div>
    </div>`;
      })
      .join("");
  });

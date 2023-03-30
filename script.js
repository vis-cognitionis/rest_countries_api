//Required variables
const regionOptions = document.querySelector(".region-options"),
  filterArea = document.getElementById("filter-area"),
  allCountryCards = document.getElementById("country-cards"),
  loading = document.querySelector(".loader-container"),
  regions = document.getElementsByClassName("region"),
  countryCard = document.getElementsByClassName("country-card"),
  search = document.getElementById("search");
let countryCards = [];

//Required to toggle options in the filter field
filterArea.addEventListener("click", () => {
  regionOptions.classList.toggle("region-options-open");
});

//Required to close the options section that opens when clicking outside the filtering area
document.addEventListener("click", (event) => {
  if (!event.target.closest("#filter-area")) {
    regionOptions.classList.remove("region-options-open");
  }
});

//Required to load data from API with GET method
const getData = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    countryCards = data;
    loading.style.display = "none";
    showCountryCards(countryCards);
  } catch (error) {
    console.error(error);
  }
};

getData();

const showCountryCards = (countries) => {
  if (countries.length > 0) {
    allCountryCards.innerHTML = countries
      .map((country) => {
        return `<div class="country-card">
    <div class="country-flag-container">
   <img class="country-flag" src=${country.flags.svg}
   loading="lazy">
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
  <strong>Capital:</strong>
   <span> ${country.capital}</span>  </div>
</div>
    </div>`;
      })
      .join("");
  } else {
    allCountryCards.innerHTML = "<p class='not-found-message'>No result!</p>";
  }
};

//Required to filter regions on homepage
for (let i = 0; i < regions.length; i++) {
  regions[i].addEventListener("click", () => {
    const filteredCards = countryCards.filter(
      (country) => country.region === regions[i].textContent
    );
    showCountryCards(filteredCards);
  });
}

//Required to search countries on homepage
search.addEventListener("keyup", () => {
  const searchString = search.value.toLowerCase();
  const filteredCards = countryCards.filter((country) =>
    country.name.common.toLowerCase().includes(searchString)
  );
  showCountryCards(filteredCards);
});

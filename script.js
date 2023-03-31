//Required variables for homepage
const regionOptions = document.querySelector(".region-options"),
  homePage = document.getElementById("home-page"),
  filterArea = document.getElementById("filter-area"),
  allCountryCards = document.getElementById("country-cards"),
  loading = document.querySelector(".loader-container"),
  regions = document.getElementsByClassName("region"),
  countryCard = document.getElementsByClassName("country-card"),
  search = document.getElementById("search");
let countryCards = [];

//Required variabled for detailpage
const detailPage = document.getElementById("detail-page"),
  info1 = document.getElementsByClassName("info-1"),
  info2 = document.getElementsByClassName("info-2"),
  detailFlag = document.querySelector("#detail-flag"),
  countryName = document.querySelector("#country-name"),
  nativeName = document.querySelector("#native-name"),
  capital = document.querySelector("#capital"),
  population = document.querySelector("#population"),
  region = document.querySelector("#region"),
  subregion = document.querySelector("#subregion"),
  languages = document.querySelector("#languages"),
  currencies = document.querySelector("#currencies"),
  topLevelDomain = document.querySelector("#top-level-domain"),
  borderCountries = document.querySelector("#border-countries"),
  backButton = document.querySelector("#back-button"),
  borderCountriesList = document.getElementById("border-countries-list");

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
   loading="lazy"
   draggable="false">
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

    //Required to navigate to the relevant detail page according to the clicked country card
    const filteredCountryCards = Array.from(allCountryCards.children);
    filteredCountryCards.forEach((countryCard, i) => {
      countryCard.addEventListener("click", () => {
        const clickedCountry = countries[i];
        showDetailPage(clickedCountry);
      });
    });
  } else {
    allCountryCards.innerHTML = "<p class='not-found-message'>No result!</p>";
  }
};

const showDetailPage = (country) => {
  homePage.style.display = "none";
  detailPage.style.display = "block";

  nativeName.textContent = country.name.common;
  detailFlag.src = country.flags.svg;
  countryName.textContent = country.name.common;
  capital.textContent = country.capital[0];
  population.textContent = country.population.toLocaleString();
  region.textContent = country.region;
  subregion.textContent = country.subregion;
  languages.textContent = Object.values(country.languages).join(", ");
  currencies.textContent = Object.values(country.currencies)
    .map((currency) => currency.name)
    .join(", ");
  topLevelDomain.textContent = country.tld.join(", ");
  borderCountriesList.innerHTML = "";

  if (country.borders) {
    country.borders.forEach((border) => {
      const button = document.createElement("div");
      const borderCountry = countryCards.find((item) => item.cca3 === border);
      button.textContent = borderCountry.name.common;
      button.addEventListener("click", () => {
        const clickedBorder = countryCards.find((item) => item.cca3 === border);
        showDetailPage(clickedBorder);
      });
      borderCountriesList.appendChild(button);
    });
  } else {
    borderCountriesList.innerHTML =
      "<p style='font-weight:normal; margin:0' >No border countries found.</p>";
  }
};

backButton.addEventListener("click", () => {
  detailPage.style.display = "none";
  homePage.style.display = "block";
});

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

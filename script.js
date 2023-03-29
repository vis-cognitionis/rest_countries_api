const regionOptions = document.querySelector(".region-options");
const filterArea = document.getElementById("filter-area");
const main = document.getElementById("country-cards");

filterArea.addEventListener("click", () => {
  regionOptions.classList.toggle("region-options-open");
});

//sample data
const divArray = Array(10).fill(
  `<div style="border: 1px solid red; width: 200px; height:300px"></div>`
);
main.innerHTML = divArray.join("");

//Required to close the options section that opens when clicking outside the filtering area
document.addEventListener("click", (event) => {
  if (!event.target.closest("#filter-area")) {
    regionOptions.classList.remove("region-options-open");
  }
});

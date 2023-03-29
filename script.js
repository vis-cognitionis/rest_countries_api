const regionOptions = document.querySelector(".region-options");
const filterArea = document.getElementById("filter-area");

filterArea.addEventListener("click", () => {
  regionOptions.classList.toggle("region-options-open");
});

//Required to close the options section that opens when clicking outside the filtering area.
document.addEventListener("click", (event) => {
  if (!event.target.closest("#filter-area")) {
    regionOptions.classList.remove("region-options-open");
  }
});

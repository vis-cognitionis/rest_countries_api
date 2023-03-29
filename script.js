const regionOptions = document.querySelector(".region-options");
const filterArea = document.getElementById("filter-area");

filterArea.addEventListener("click", () => {
  regionOptions.classList.toggle("region-options-open");
  console.log("girdi");
});

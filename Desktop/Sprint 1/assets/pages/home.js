import {
  createCard,
  showCheckbox,
  emptyContainer,
  crossedFilters,
} from "../modules/functions.js";

let categories;
let categoriesNoRepeat;
let categoriesArray;
let checkboxContainer = document.getElementById("checkboxContainer");
let inputSearch = document.getElementById("searchBar");
let checkboxChecked = [];
let events;
let container = document.getElementById("homeCardContainer");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((res) => res.json())
  .then((data) => {
    events = data.events;
    categories = events.map((event) => event.category);
    categoriesNoRepeat = new Set(categories);
    categoriesArray = Array.from(categoriesNoRepeat);
    printCard(events, container);
    showCheckbox(categoriesArray, checkboxContainer);
  })
  .catch((err) => console.log(err));

// Functions

function printCard(array, elementHTML) {
  let template = "";
  for (let event of array) {
    template += createCard(event);
  }
  elementHTML.innerHTML += template;
  if (template.length == 0) {
    elementHTML.innerHTML = `NO RESULTS FOUND`;
  }
}

// Event Listeners
checkboxContainer.addEventListener("change", (e) => {
  let checkedCheckboxes = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );
  let checkedArray = Array.from(checkedCheckboxes);
  checkboxChecked = checkedArray.map((checkbox) => checkbox.value);

  let arrayFinal = crossedFilters(events, inputSearch, checkboxChecked);

  emptyContainer(container);
  printCard(arrayFinal, container);
});

inputSearch.addEventListener("input", (e) => {
  let arrayFinal = crossedFilters(events, inputSearch, checkboxChecked);
  emptyContainer(container);
  printCard(arrayFinal, container);
});

import {
  printCard,
  createCard,
  showCheckbox,
  emptyContainer,
  crossedFilters,
} from "../modules/functions.js";

let containerPast = document.getElementById("pastEventsContainer");
let currentDate;
let events;
let categories;
let categoriesNoRepeat;
let categoriesArray;
let checkboxContainer = document.getElementById("checkboxContainer");
let inputSearch = document.getElementById("searchBar");
let checkboxChecked = [];
let pastEventTemplate = "";
let upcomingEventTemplate = "";

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((res) => res.json())
  .then((data) => {
    events = data.events;
    currentDate = data.currentDate;
    categories = events.map((event) => event.category);
    categoriesNoRepeat = new Set(categories);
    categoriesArray = Array.from(categoriesNoRepeat);
    printCard(containerPast, filterCard(events));
    showCheckbox(categoriesArray, checkboxContainer);
  });

// functions

function filterCard(array) {
  let template = "";
  for (let event of array) {
    if (event.date < currentDate) {
      template += createCard(event);
    }
  }
  console.log(template);
  return template;
}

// eventListeners

checkboxContainer.addEventListener("change", (e) => {
  let checkedCheckboxes = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );
  let checkedArray = Array.from(checkedCheckboxes);
  checkboxChecked = checkedArray.map((checkbox) => checkbox.value);
  let arrayFinal = crossedFilters(events, inputSearch, checkboxChecked);
  emptyContainer(containerPast);
  printCard(containerPast, filterCard(arrayFinal));
});

inputSearch.addEventListener("input", (e) => {
  let arrayFinal = crossedFilters(events, inputSearch, checkboxChecked);
  emptyContainer(containerPast);
  printCard(containerPast, filterCard(arrayFinal));
});

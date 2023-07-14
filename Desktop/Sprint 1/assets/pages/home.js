let container = document.getElementById("homeCardContainer");

let events = data.events;

function createCard(event) {
  return `<div class="card col-11 col-md-5 col-lg-3 border border-4 text-white">
            <img src="${event.image}" class="card-img-top"
            alt="food fair photo"">
            <div class="card-body d-flex flex-column"> 
              <h5 class="card-title pt-3 pb-4">${event.name}</h5>
              <p class="card-text mb-3  fst-italic">
              ${event.description}
              </p>
              <div class="d-flex flex-wrap justify-content-between mt-auto pt-3">
                <p class="align-self-center fw-bold">Price: ${event.price}</p>
                <a href="./assets/pages/details.html?parameter=${event._id}" class="btn btn-danger p-3 fw-bold">
                Details
                </a>
              </div>
            </div>
          </div>`;
}

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

printCard(events, container);

let categories = events.map((event) => event.category);
let categoriesNoRepeat = new Set(categories);
let categoriesArray = Array.from(categoriesNoRepeat);
let checkboxContainer = document.getElementById("checkboxContainer");
let inputSearch = document.getElementById("searchBar");

function createCheckbox(category) {
  return `<div><input
  type="checkbox"
  class="form-check-input border-2"
  id="${category}"
  name="category"
  value="${category}"
>
  <label class="form-check-label pe-2" for="${category}">${category} </label></div>`;
}

function showCheckbox(array, location) {
  for (let checkbox of array) {
    location.innerHTML += createCheckbox(checkbox);
  }
}

showCheckbox(categoriesArray, checkboxContainer);

let checkboxChecked = [];

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

function emptyContainer(elementHTML) {
  return (elementHTML.innerHTML = "");
}

function crossedFilters(array, input, checkboxChecked) {
  let inputFilter = filterSearch(array, input);
  let checkboxFilter = filterCheckbox(array, checkboxChecked);
  let filterFinal = inputFilter.filter((event) =>
    checkboxFilter.includes(event)
  );
  return filterFinal;
}

let filterCheckbox = (array, checkedArray) => {
  let checkboxesFiltered = array.filter((event) =>
    checkedArray.includes(event.category)
  );
  if (checkboxesFiltered.length == 0 && checkboxesFiltered.length == 0) {
    checkboxesFiltered = events;
  }
  return checkboxesFiltered;
};

let filterSearch = (array, input) => {
  let eventsFiltered = array.filter(
    (event) =>
      event.name.toLowerCase().startsWith(input.value.toLowerCase()) ||
      event.category.toLowerCase().startsWith(input.value.toLowerCase())
  );
  return eventsFiltered;
};

inputSearch.addEventListener("input", (e) => {
  let arrayFinal = crossedFilters(events, inputSearch, checkboxChecked);
  emptyContainer(container);
  printCard(arrayFinal, container);
});

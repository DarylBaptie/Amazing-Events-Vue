export function createCard(event) {
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
                
                <a href="${
                  window.location.pathname == "/Desktop/Sprint%201/index.html"
                    ? "./assets/pages/details.html?parameter="
                    : "./details.html?parameter="
                } ${event._id}" class="btn btn-danger p-3 fw-bold">
                Details
                </a>
              </div>
            </div>
          </div>`;
}

export function createCheckbox(category) {
  return `<div><input
  type="checkbox"
  class="form-check-input border-2"
  id="${category}"
  name="category"
  value="${category}"
>
  <label class="form-check-label pe-2" for="${category}">${category} </label></div>`;
}

export function showCheckbox(array, location) {
  for (let checkbox of array) {
    location.innerHTML += createCheckbox(checkbox);
  }
}

export function emptyContainer(elementHTML) {
  return (elementHTML.innerHTML = "");
}

export let filterCheckbox = (array, checkedArray) => {
  let checkboxesFiltered = array.filter((event) =>
    checkedArray.includes(event.category)
  );
  if (checkboxesFiltered.length == 0 && checkboxesFiltered.length == 0) {
    checkboxesFiltered = array;
  }
  return checkboxesFiltered;
};

export let filterSearch = (array, input) => {
  let eventsFiltered = array.filter(
    (event) =>
      event.name.toLowerCase().startsWith(input.value.toLowerCase()) ||
      event.category.toLowerCase().startsWith(input.value.toLowerCase())
  );
  return eventsFiltered;
};

export function crossedFilters(array, input, checkboxChecked) {
  let inputFilter = filterSearch(array, input);
  let checkboxFilter = filterCheckbox(array, checkboxChecked);
  let filterFinal = inputFilter.filter((event) =>
    checkboxFilter.includes(event)
  );
  return filterFinal;
}

export function filterCard(array, currentDate) {
  let pastEventTemplate = "";
  let upcomingEventTemplate = "";
  for (let event of array) {
    if (event.date < currentDate) {
      pastEventTemplate += createCard(event);
    } else {
      upcomingEventTemplate += createCard(event);
    }
  }
}

export function printCard(elementHTML, template) {
  elementHTML.innerHTML += template;
  if (elementHTML.innerHTML.length == 0) {
    elementHTML.innerHTML = `NO RESULTS FOUND`;
  }
}

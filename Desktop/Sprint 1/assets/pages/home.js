let container = document.getElementById("homeCardContainer");

let events = data.events;

function createCard(event) {
  return `<div class="card col-11 col-md-5 col-lg-3 border border-4 text-white">
            <img src="${event.image}" class="card-img-top h-60"
            alt="food fair photo"">
            <div class="card-body d-flex flex-column"> 
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text mb-3 fst-italic">
            ${event.description}
          </p>
          <div class="d-flex flex-wrap justify-content-between mt-auto">
          <p class="align-self-center fw-bold">Price: ${event.price}</p>
          <a href="./assets/pages/details.html" class="btn btn-danger fw-bold">
            Details
          </a>
        </div>
               </div>
            </div>`;
}

function printCard(array, elementoHTML) {
  let template = "";
  for (let event of array) {
    template += createCard(event);
  }
  elementoHTML.innerHTML += template;
}

printCard(events, container);

//

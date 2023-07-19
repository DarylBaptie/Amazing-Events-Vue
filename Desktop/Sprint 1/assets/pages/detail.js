let events;
let eventCard;
let cardContainer = document.getElementById("cardContainer");
let parameter = location.search;
let params = new URLSearchParams(parameter);
let id = params.get("parameter");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((res) => res.json())
  .then((data) => {
    events = data.events;
    eventCard = events.find((event) => event._id == id);
    printCard(eventCard, cardContainer);
  })
  .catch((err) => console.log(err));

function createCard(event) {
  return `
    <div class="card text-white border border-3 text-center text-md-start">
        <div class="row g-0 justify-content-evenly">
          <div class="col-12 col-md-7">
            <img
              src="${event.image}"
              class="img-fluid rounded border border-3"
              alt="food fair photo"
            />
          </div>
          <div class="col-12 col-md-5">
            <div class="d-flex flex-column card-body gap-2">
              <h5 class="card-title">${event.name}</h5>

              <p class="card-text fst-italic">
                ${event.description}
              </p>
              <p>Date: ${event.date}</p>
              <p>Category: ${event.category}</p>
              <p>Place: ${event.place}</p>
              <p>Capacity: ${event.capacity}</p>
              <p>
              ${event.assistance ? "Assistance" : "Estimate"}: ${
    event.assistance || event.capacity
  } </p>
              <p>Price: ${event.price}</p>
            </div>
          </div>
        </div>
      </div>
    `;
}

function printCard(eventCard, elementHTML) {
  let template = createCard(eventCard);
  elementHTML.innerHTML += template;
}

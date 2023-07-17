let events;
let currentDate;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((res) => res.json())
  .then((data) => {
    events = data.events;
    currentDate = data.currentDate;
    console.log(revenuePast(events));
  })
  .catch((error) => console.log(error));

function biggestCapacity(array) {
  const capacitySort = array.sort((a, b) => {
    if (a.capacity > b.capacity) {
      return -1;
    }
    if (b.capacity < a.capacity) {
      return 1;
    }
    return 0;
  });
  return capacitySort;
}

function percentageAssistance(array) {
  let pastEvents = array.filter((event) => event.date < currentDate);
  for (let event of pastEvents) {
    event.percentage = (event.assistance / event.capacity) * 100;
  }
  const percentageAssistanceSort = pastEvents.sort((a, b) => {
    if (a.percentage > b.percentage) {
      return -1;
    }
    if (b.percentage < a.percentage) {
      return 1;
    }
    return 0;
  });
  return percentageAssistanceSort;
}

function revenuePast(array) {
  let pastEvents = array.filter((event) => event.date < currentDate);
  for (let event of pastEvents) {
    event.revenue = event.assistance * event.price;
  }

  let result = pastEvents.reduce((acc, curr) => {
    let item = acc.find((event) => event.category === curr.category);
    if (item) {
      item.amount += curr.amount;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
  return result;
}

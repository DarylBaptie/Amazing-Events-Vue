let events;
let currentDate;
let headTable = document.getElementById("headTable");
let table1 = document.getElementById("firstTable");
let table2 = document.getElementById("secondTable");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((res) => res.json())
  .then((data) => {
    events = data.events;
    currentDate = data.currentDate;
    printRow(revenueFuture(events), table1);
    printRow(revenuePast(events), table2);
    printRow2(events, headTable);
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

  return capacitySort[0];
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

////////////

function revenuePast(array) {
  let pastEvents = array.filter((event) => event.date < currentDate);
  for (let event of pastEvents) {
    event.revenue = event.assistance * event.price;
  }

  const summed = pastEvents.reduce((acc, cur, i) => {
    const item = i > 0 && acc.find(({ category }) => category === cur.category);
    if (item)
      (item.revenue += cur.revenue),
        (item.capacity += cur.capacity),
        (item.assistance += cur.assistance);
    else
      acc.push({
        category: cur.category,
        revenue: cur.revenue,
        capacity: cur.capacity,
        assistance: cur.assistance,
      }); // don't push cur here
    return acc;
  }, []);

  for (let category of summed) {
    category.percentileAssistance = (
      (category.assistance / category.capacity) *
      100
    ).toFixed(2);
  }

  return summed;
}

function revenueFuture(array) {
  let pastEvents = array.filter((event) => event.date > currentDate);
  for (let event of pastEvents) {
    event.revenue = event.estimate * event.price;
  }
  const summed = pastEvents.reduce((acc, cur, i) => {
    const item = i > 0 && acc.find(({ category }) => category === cur.category);
    if (item)
      (item.revenue += cur.revenue),
        (item.capacity += cur.capacity),
        (item.estimate += cur.estimate);
    else
      acc.push({
        category: cur.category,
        revenue: cur.revenue,
        capacity: cur.capacity,
        estimate: cur.estimate,
      }); // don't push cur here
    return acc;
  }, []);

  for (let category of summed) {
    category.percentileAssistance = (
      (category.estimate / category.capacity) *
      100
    ).toFixed(2);
  }

  return summed;
}

function createRow(category) {
  return `
  <td >${category.category}</td>
  <td >${category.revenue}</td>
  <td >${category.percentileAssistance}</td>
  `;
}

function printRow(array, location) {
  for (let checkbox of array) {
    location.innerHTML += createRow(checkbox);
  }
}

function firstRow(array) {
  let highestEvent = biggestCapacity(array);
  let highestPercentage = percentageAssistance(array)[0];
  let lowestPercentage =
    percentageAssistance(array)[percentageAssistance(array).length - 1];
  console.log(lowestPercentage);
  console.log(highestPercentage);

  return `
  <td>${highestPercentage.name}</td>
  <td>${lowestPercentage.name}</td>
  <td>${highestEvent.name}</td>`;
}

function printRow2(array, location) {
  location.innerHTML += firstRow(array);
}

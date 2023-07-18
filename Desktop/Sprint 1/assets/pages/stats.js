let events;
let currentDate;
let table1 = document.getElementById("headTable");
let table2 = document.getElementById("firstTable");
let table3 = document.getElementById("secondTable");
let futureEvents;
let pastEvents;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((res) => res.json())
  .then((data) => {
    events = data.events;
    currentDate = data.currentDate;
    pastEvents = events.filter((event) => event.date < currentDate);
    futureEvents = events.filter((event) => event.date > currentDate);
    console.log(pastEvents, futureEvents);
    printRow(
      events,
      revenue(events, futureEvents, "estimate"),
      revenue(events, pastEvents, "assistance"),
      table1,
      table2,
      table3
    );
  })
  .catch((error) => console.log(error));

/// FUNCTIONS 1ST ROW

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
    event.percentage = (event.assistance / event.capacity)
      .toLocaleString("en-US", { style: "percent", minimumFractionDigits: 2 })
      .replace(".00", "");
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

/// FUNCTIONS 2ND ROW

function revenue(array, array2, attendees) {
  for (let event of array) {
    event.revenue = event[attendees] * event.price;
  }
  const categoryArray = array2.reduce((acc, cur) => {
    const item = acc.find(({ category }) => category === cur.category);
    if (item)
      (item.revenue += cur.revenue),
        (item.capacity += cur.capacity),
        (item[attendees] += cur[attendees]);
    else
      acc.push({
        category: cur.category,
        revenue: cur.revenue,
        capacity: cur.capacity,
        [attendees]: cur[attendees],
      });
    return acc;
  }, []);

  for (let category of categoryArray) {
    category.percentileAssistance = (category[attendees] / category.capacity)
      .toLocaleString("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
      })
      .replace(".00", "");
    category.revenue = category.revenue.toLocaleString("en-US");
  }

  return categoryArray;
}

/// FUNCTIONS CREATE AND PRINT ROWS

function firstRow(array) {
  let highestCapacity = biggestCapacity(array);
  let highestPercentage = percentageAssistance(array)[0];
  let lowestPercentage =
    percentageAssistance(array)[percentageAssistance(array).length - 1];

  return `
  <td>${highestPercentage.name} (${highestPercentage.percentage})</td>
  <td>${lowestPercentage.name}: (${lowestPercentage.percentage})</td>
  <td>${highestCapacity.name} (${highestCapacity.capacity.toLocaleString(
    "en-US"
  )})</td>`;
}

function createRow(category) {
  return `
  <td >${category.category}</td>
  <td >${category.revenue}</td>
  <td >${category.percentileAssistance}</td>
  `;
}

function printRow(array1, array2, array3, table1, table2, table3) {
  table1.innerHTML += firstRow(array1);

  for (let checkbox of array2) {
    table2.innerHTML += createRow(checkbox);
  }
  for (let checkbox of array3) {
    table3.innerHTML += createRow(checkbox);
  }
}

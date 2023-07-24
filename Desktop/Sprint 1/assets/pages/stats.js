const { createApp } = Vue;

createApp({
  data() {
    return {
      events: [],
      currentDate: "",
      futureEvents: [],
      pastEvents: [],
      highestCapacity: [],
      highestPercentage: [],
      lowestPercentage: [],
      categoriesPastArray: [],
      categoriesFutureArray: [],
    };
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((res) => res.json())
      .then((data) => {
        this.events = data.events;
        this.currentDate = data.currentDate;
        this.pastEvents = this.events.filter(
          (event) => event.date < this.currentDate
        );
        this.futureEvents = this.events.filter(
          (event) => event.date > this.currentDate
        );
        this.highestCapacity = this.biggestCapacity(this.events);
        this.highestPercentage = this.percentageAssistance(this.events)[0];
        this.lowestPercentage = this.percentageAssistance(this.events)[
          this.percentageAssistance(this.events).length - 1
        ];
        this.categoriesPastArray = this.revenueAssistance(
          this.events,
          this.pastEvents,
          "assistance"
        );
        this.categoriesFutureArray = this.revenueAssistance(
          this.events,
          this.futureEvents,
          "estimate"
        );
      })
      .catch((err) => console.log(err));
  },
  methods: {
    biggestCapacity(array) {
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
    },

    percentageAssistance(array) {
      let pastEvents = array.filter((event) => event.date < this.currentDate);
      for (let event of pastEvents) {
        event.percentage = (event.assistance / event.capacity)
          .toLocaleString("en-US", {
            style: "percent",
            minimumFractionDigits: 2,
          })
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
    },
    revenueAssistance(array, array2, attendees) {
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
        category.percentileAssistance = (
          category[attendees] / category.capacity
        )
          .toLocaleString("en-US", {
            style: "percent",
            minimumFractionDigits: 2,
          })
          .replace(".00", "");
        category.revenue = category.revenue.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        });
      }

      return categoryArray;
    },
  },
}).mount("#app");

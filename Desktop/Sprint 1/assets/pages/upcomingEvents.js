const { createApp } = Vue;

createApp({
  data() {
    return {
      events: [],
      categories: [],
      currentDate: null,
      futureEvents: [],
      checkboxChecked: [],
      eventsFiltered: [],
      valueSearch: "",
    };
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((res) => res.json())
      .then((data) => {
        this.events = data.events;
        this.categories = [
          ...new Set(data.events.map((event) => event.category)),
        ];
        this.currentDate = data.currentDate;
        this.futureEvents = data.events.filter(
          (event) => event.date > data.currentDate
        );
        this.eventsFiltered = this.futureEvents;
      })
      .catch((err) => console.log(err));
  },
  computed: {
    filter() {
      this.eventsFiltered = this.futureEvents.filter(
        (event) =>
          event.name.toLowerCase().startsWith(this.valueSearch.toLowerCase()) &&
          (this.checkboxChecked.includes(event.category) ||
            this.checkboxChecked.length == 0)
      );
    },
  },
}).mount("#app");

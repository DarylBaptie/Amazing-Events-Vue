const { createApp } = Vue;

createApp({
  data() {
    return {
      events: [],
      categories: [],
      currentDate: null,
      pastEvents: [],
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
        this.pastEvents = data.events.filter(
          (event) => event.date < data.currentDate
        );
        this.eventsFiltered = this.pastEvents;
        console.log(this.pastEvents);
      })
      .catch((err) => console.log(err));
  },
  computed: {
    filter() {
      this.eventsFiltered = this.pastEvents.filter(
        (event) =>
          event.name.toLowerCase().startsWith(this.valueSearch.toLowerCase()) &&
          (this.checkboxChecked.includes(event.category) ||
            this.checkboxChecked.length == 0)
      );
    },
  },
}).mount("#app");

const { createApp } = Vue;

createApp({
  data() {
    return {
      events: [],
      categories: [],
      valueSearch: "",
      checkboxChecked: [],
      eventsFiltered: [],
    };
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((res) => res.json())
      .then((data) => {
        this.events = data.events;
        this.eventsFiltered = data.events;
        this.categories = [
          ...new Set(data.events.map((event) => event.category)),
        ];
      })
      .catch((err) => console.log(err));
  },

  computed: {
    filter() {
      this.eventsFiltered = this.events.filter(
        (event) =>
          event.name.toLowerCase().startsWith(this.valueSearch.toLowerCase()) &&
          (this.checkboxChecked.includes(event.category) ||
            this.checkboxChecked.length == 0)
      );
      console.log(this.eventsFiltered);
    },
  },
}).mount("#app");

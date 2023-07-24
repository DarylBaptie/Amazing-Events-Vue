const { createApp } = Vue;

createApp({
  data() {
    return {
      events: [],
      eventCard: [],
      parameter: null,
      params: null,
      id: null,
    };
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((res) => res.json())
      .then((data) => {
        this.events = data.events;
        this.parameter = location.search;
        this.params = new URLSearchParams(this.parameter);
        this.id = this.params.get("parameter");
        this.eventCard = this.events.filter((event) => event._id == this.id);
      })
      .catch((err) => console.log(err));
  },
}).mount("#app");

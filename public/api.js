const API = {
  async getLastWorkout() {
    const res = await fetch("/api/workouts");
    const json = await res.json();

    return json[json.length - 1];
  },
  async addExercise(data) {
    //const id = location.search.split("=")[1];
    //console.log("add exercise id"+id);
    console.log(data);
    const res = await fetch("/api/workouts/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async removeExercise(id){
    var data = {_id: id};
    const res = await fetch("/api/workouts/remove", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout() {
    const res = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();
    
    return json;
  },
};
module.exports=API;
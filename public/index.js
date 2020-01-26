
const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout")

const continue1 = document.querySelector("#continue1");
const new1 = document.querySelector("#new1");
let workoutType = null;
let shouldNavigateAway = false;


init();

async function init() {
  console.log(location.search);
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    if (workout) {
      location.search = "?id=" + workout._id;
    }
    else {
      newWorkout.classList.add("")
    }
  }
  var flag = localStorage.getItem("someVarKey");
  console.log("flag init " + flag);
}

function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;

  if (workoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  } else if (workoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }

  validateInputs();
}

function validateInputs() {
  let isValid = true;
  console.log("in validate input " + isValid);
  if (workoutType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  } else if (workoutType === "cardio") {
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }

  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}
let workoutData1 = {};
async function handleFormSubmit(event) {

  event.preventDefault();


  console.log("in form submit");

  var flag = localStorage.getItem("someVarKey");


  //let exercise ={};
  let workoutData = {};
  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }
  //console.log(route1.flag);
  //if(!route1.flag){

  const workout = await API.getLastWorkout();
  let id;
  if(workout){
   id = workout._id;
  }
  console.log("id" + id);
  console.log("flag" + flag);
  if (flag == null) {
    workoutData1 = {
      day: new Date().setDate(new Date().getDate()),
      exercises: [
        workoutData
      ]
    };
  }
  else {
    await API.removeExercise(id);
    workout.exercises.push(workoutData);
    workoutData1 = workout;
  }
  //route1.flag=true;
  /*}
  else{
    workoutData1.exercises.push(workoutData);
  }*/
  //exercise[0]=workoutData;
  //console.log(exercise);


  await API.addExercise(workoutData1);
  var someVarName = true;
  localStorage.setItem("someVarKey", someVarName);
  clearInputs();
  toast.classList.add("success");
}

function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}

function continue1fn() {
  console.log("in continue");
  var someVarName = true;
  localStorage.setItem("someVarKey", someVarName);
}
function new1fn() {
  console.log("in new");
  localStorage.clear();
}
if (workoutTypeSelect) {
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}
toast.addEventListener("animationend", handleToastAnimationEnd);
if(continue1){
continue1.addEventListener("click", continue1fn);}
if(new1){
new1.addEventListener("click", new1fn);}
document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));

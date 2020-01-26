const router = require("express").Router();
const Workout = require("../models/workout.js");

let mongoose = require("mongoose");
let flag = false;
let id ;
mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

router.put("/api/workouts", ({ body }, res) => {
  Workout.collection.insert(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
      id = dbWorkout._id;
      console.log(id);
    })
    .catch(err => {
      res.status(400).json(err);
    });
   //Workout.collection.remove();
     
});

//remove element by id
router.put("/api/workouts/remove", ({ body }, res) => {
  Workout.collection.remove(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
      id = dbWorkout._id;
      console.log(id);
    })
    .catch(err => {
      res.status(400).json(err);
    });
   //Workout.collection.remove();
     
});

router.post("/api/workouts/bulk", ({ body }, res) => {
  Workout.insertMany(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      console.log("dbworkout"+dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      console.log("dbworkout"+dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;

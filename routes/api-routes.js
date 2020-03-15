const db = require("../models");

module.exports = app => {

  app.get("/api/workouts", (req, res) => {
    //return all workouts
    db.Workout.find({})
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });
    
  app.get("/api/workouts/range", (req, res) => {
    //returns seven most recent workouts by date
    db.Workout.find({}, {}, { sort: { "day" : -1 } }).limit(7)
      .then(dbWorkouts => {
        res.json(dbWorkouts.reverse());
      })
      .catch(err => {
        res.json(err);
      });
  });  
  
  app.put("/api/workouts/:id", (req, res) => {
    //add exercise to workout matching id
    db.Workout.findOneAndUpdate(
      { _id: req.params.id },  //target workout with id matching route parameter
      { $push: { exercises: req.body } },  //add the new exercise's id to the workout's list of exercises
      { new: true }
    )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });  
  });
  
  app.post("/api/workouts", ({ body }, res) => {
    //create new workout
    db.Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
      
};
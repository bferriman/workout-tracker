const path = require("path");

module.exports = app => {

  app.get("/stats", (req, res) => {
    console.log("in the stats html route");
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });

  app.get("/exercise", (req, res) => {
    console.log("in the exercise html route");
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });
  
};
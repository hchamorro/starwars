// Dependencies
// ===========================================================
var express = require("express");
const path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;

//set up express app to handle data pasing

app.use(express.urlencoded({ extend: true }));
app.use(express.json());

// Data
// ===========================================================
const characters = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }
];
// Routes
// ===========================================================

//general route
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

//get all the data
app.get("/api/characters", (req, res) => {
  return res.json(characters);
});

// get one obj from data
app.get("/api/characters/:character", (req, res) => {
  const chosen = req.params.character;
  let chosenOne = characters.filter(obj => {
    return obj.routeName === chosen;
  });

  if (chosenOne.length) {
    return res.json(chosenOne[0]);
  }
  return res.send("no character");
});

//add obj to data
app.post("/api/characters", (req, res) => {
  const newCharacter = req.body;
  console.log(newCharacter);

  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  //add char to db
  characters.push(newCharacter);

  //send back what i just added
  res.json(newCharacter);
});

// Listener turning on server
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

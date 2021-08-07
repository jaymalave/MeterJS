const express = require("express");
const mongoose = require("mongoose");
const Member = require("./models/members");
const app = express();
const manifest = require("./manifest.json");
const fs = require("fs");
// const serviceWorker = require('./serviceworker.js');

mongoose.connect(
  "mongodb+srv://jaymalave:JayMDB45@cluster0.otmfm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.static(__dirname + "/render/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const bodyParser = require("body-parser");

app.get("/", async (req, res) => {
  const members = await Member.find().sort({ counter: -1 });
  let topMembers = await Member.find().sort({ counter: -1 }).limit(3);
  res.render("index", { participants: members, topScorers: topMembers });
});

app.post("/participants", async (req, res) => {
  const data = new Member({ name: req.body.name });
  const savedData = await data.save();
  console.log(savedData);

  res.redirect("/");
});

app.post("/increment/:participantName", async (req, res) => {
  const incrementVal = await Member.findOne({
    name: req.params.participantName,
  });
  if (incrementVal == null) return res.sendStatus(404);

  incrementVal.counter++;
  incrementVal.save();
  res.redirect("/");
});

app.get("/manifest.json", (req, res) => {
  res.send(manifest);
});

app.get("/serviceworker.js", (req, res) => {
  res
    .type("text/javascript")
    .send(fs.readFileSync("./serviceworker.js", "utf-8"))
    .end();
});

app.get("/manifest/icon-192x192.png", (req, res) => {
  res
    .type("png")
    .send(fs.readFileSync("./manifest/icon-192x192.png"))
    .end();
});
app.get("/manifest/icon-256x256.png", (req, res) => {
  res
    .type("png")
    .send(fs.readFileSync("./manifest/icon-256x256.png"))
    .end();
});
app.get("/manifest/icon-384x384.png", (req, res) => {
  res
    .type("png")
    .send(fs.readFileSync("./manifest/icon-384x384.png"))
    .end();
});
app.get("/manifest/icon-512x512.png", (req, res) => {
  res
    .type("png")
    .send(fs.readFileSync("./manifest/icon-512x512.png"))
    .end();
});

app.listen(process.env.PORT || 5000);

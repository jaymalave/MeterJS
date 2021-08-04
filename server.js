const express = require("express");
const mongoose = require("mongoose");
const Member = require("./models/members");
const app = express();

mongoose.connect(
  "mongodb+srv://jaymalave:JayMDB45@cluster0.otmfm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const bodyParser = require("body-parser");

app.get("/", async (req, res) => {
  const members = await Member.find().sort({"counter":-1});
  res.render("index", { participants: members });
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

app.listen(process.env.PORT || 5000);

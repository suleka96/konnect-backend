/*
******************************************************* 
* IMPORT DEPENDENCIES
*******************************************************
*/

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//var cors = require('cors');

/*******************************************************************************************************************************/

const app = express();

/*
******************************************************* 
* SET PORT
*******************************************************
*/

const PORT = process.env.PORT || 5000; //Port is assigned at runtime by Heroku or 5000 by default
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

/*******************************************************************************************************************************/

/*
******************************************************* 
* DEFINE PATHS
*******************************************************
*/

app.use(express.static(path.join(__dirname, "public"))); //Define path for static assets
app.set("views", path.join(__dirname, "views")); //Define path for views
app.set("view engine", "ejs"); //Define view engine as EJS
//app.use(cors());

/*******************************************************************************************************************************/

/*
******************************************************* 
* CONNECTION TO DATABASE
*******************************************************
*/

let URI =
  "mongodb://heroku_24qgfjxh:5u7so4mv67fq7ahpjvcpacddgg@ds119489.mlab.com:19489/heroku_24qgfjxh"; //mLab Connection URI
mongoose.connect(URI); //Connecting to mLab Database

/*******************************************************************************************************************************/

/*
******************************************************* 
* DEFINE SCHEMAS AND CREATE MODELS FOR COLLECTIONS
*******************************************************
*/

var Schema = mongoose.Schema;

var profilesSchema = new Schema({
  profileId: String,
  mobileNo: String,
  dateOfBirth: Date,
  homeAddress: String,
  links: {
    facebookURL: String,
    twitterURL: String,
    linkedinURL: String,
    blogURL: String
  },
  work: {
    companyName: String,
    companyWebsite: String,
    workAddress: String,
    workEmail: String,
    designation: String
  }
});

var requestsSchema = new Schema({
  requesterUserId: String,
  receivedProfileId: String
});

var receivedProfilesSchema = new Schema({
  receivedProfileId: String,
  connectionId: String //connectionId is the requesterId but after the connection has been approved by the user.
});

var usersSchema = new Schema({
  userId: String,
  fName: String,
  lName: String,
  bio: String,
  profilePic: String,
  profiles: [profilesSchema],
  requests: [requestsSchema],
  receivedProfiles: [receivedProfilesSchema]
});

var Profile = mongoose.model("profiles", profilesSchema);
var Request = mongoose.model("requests", requestsSchema);
var ReceivedProfile = mongoose.model("receivedProfiles", receivedProfilesSchema);
var User = mongoose.model("users", usersSchema);

var user1 = new User({
  userId: "konnect123",
  fName: "Raneesh",
  lName: "Gomez",
  bio: "Bla bla bla",
  profilePic: "base64",
  profiles: [],
  requests: [],
  receivedProfiles: []
});

user1.save(function(err) {
    if (err) console.log('Database Error: ' + err);
});

var profile1 = new Profile({
  profileId: "profile123",
  mobileNo: "07777777777",
  dateOfBirth: new Date,
  homeAddress: "478/35 aluthmawatha",
  links: {
    facebookURL: "facebook",
    twitterURL: "twitter",
    linkedinURL: "linkedin",
    blogURL: "blog"
  },
  work: {
    companyName: "some company",
    companyWebsite: "www.company.com",
    workAddress: "23/4 company road, colombo",
    workEmail: "company@company.com",
    designation: "companist"
  }
});

user1.profiles.push(profile1);

/*******************************************************************************************************************************/

/*
******************************************************* 
* DEFINE ROUTES
*******************************************************
*/

//Create application/json parser
var jsonParser = bodyParser.json();

//Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//GET request handler for index route
app.get("/", (req, res) => res.render("pages/index"));

//POST request handler for register route
app.post("/register", jsonParser, function(req, res) {
  console.log("inside register route");
  if (!req.body) return res.sendStatus(400);
  var registerInfo = req.body;
  res.sendStatus(200).send(req.body);
  console.log(registerInfo);
});

//POST request handler for login button
app.post("/login", jsonParser, function(req, res) {
  console.log("inside login route");
  if (!req.body) return res.sendStatus(400);
  var loginInfo = req.body;
  res.sendStatus(200).send(req.body);
  console.log(loginInfo);
});

/*******************************************************************************************************************************/

const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "2ceeae7f36474cf8b24754fb5525e9ca",
});

const handleAPICall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImageCount = (req, res, db) => {
  //find user id to update their entries
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("Unable to get entries"));
};

module.exports = {
  handleImageCount,
  handleAPICall,
};

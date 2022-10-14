const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SweatersSchema = new Schema({
  name: { type: String },
  description: { type: String },
});

SweatersSchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

module.exports = mongoose.model("Sweaters", SweatersSchema);

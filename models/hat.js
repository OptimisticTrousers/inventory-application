const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HatSchema = new Schema({
  name: { type: String },
  description: { type: String },
});

HatSchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

module.exports = mongoose.model("Hat", HatSchema);

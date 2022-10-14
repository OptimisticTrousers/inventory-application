const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JerseySchema = new Schema({
  name: { type: String },
  description: { type: String },
});

JerseySchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

module.exports = mongoose.model("Jersey", JerseySchema);

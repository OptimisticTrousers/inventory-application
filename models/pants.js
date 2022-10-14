const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PantsSchema = new Schema({
  name: { type: String },
  description: { type: String },
});

PantsSchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

module.exports = mongoose.model("Pants", PantsSchema);

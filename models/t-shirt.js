const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TShirtSchema = new Schema({
  name: { type: String },
  description: { type: String },
});

TShirtSchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

module.exports = mongoose.model("T-Shirt", TShirtSchema)

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FootwearSchema = new Schema({
  name: { type: String },
  description: { type: String },
});

FootwearSchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

module.exports = mongoose.model("Footwear", FootwearSchema);

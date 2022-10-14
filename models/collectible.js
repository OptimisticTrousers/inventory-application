const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CollectibleSchema = new Schema({
  name: { type: String },
  description: { type: String },
});

CollectibleSchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

module.exports = mongoose.model("Collectible", CollectibleSchema);

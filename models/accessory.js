const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccessorySchema = new Schema({
  name: { type: String },
  description: { type: String },
});

AccessorySchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

module.exports = mongoose.model("Accessory", AccessorySchema);

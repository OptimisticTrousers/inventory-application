const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
  price: { type: Number, required: true },
  size: { type: String },
  picture: { type: Map, of: String },
});

ItemSchema.virtual("url").get(function () {
  return `/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);

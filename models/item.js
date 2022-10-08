const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: number },
  num_in_stock: { type: number },
});

ItemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);

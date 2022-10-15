const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
  size: { type: Array },
});

ItemSchema.virtual("url").get(function () {
  return `/${this.category.name}/${this._id}`;
});

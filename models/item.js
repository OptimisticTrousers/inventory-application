const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number },
  number_in_stock: { type: Number },
});

ItemSchema.virtual("url").get(function () {
  return `/${this.category.name}/${this._id}`;
});

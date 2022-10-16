const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemInstanceSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  size: { type: String },
  condition: { type: String, required: true },
  defective: { type: Boolean, required: true },
  available: { type: Boolean, required: true },
});

ItemInstanceSchema.virtual("url").get(function () {
  return `/iteminstance/${this._id}`;
});

module.exports = mongoose.model("ItemInstance", ItemInstanceSchema);

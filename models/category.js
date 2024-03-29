const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    picture: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

CategorySchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);

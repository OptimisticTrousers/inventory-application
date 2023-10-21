const async = require("async");
const Category = require("../models/category");
const Item = require("../models/item");
const ItemInstance = require("../models/iteminstance");

const home_controller = (req, res, next) => {
  async.parallel(
    {
      category_count(callback) {
        Category.countDocuments({}, callback);
      },
      item_count(callback) {
        Item.countDocuments({}, callback);
      },
      category_list(callback) {
        Category.find({}, callback);
      },
      category_list(callback) {
        const categoryIds = [
          "6532ccd867ee133486aba431",
          "6532ccd867ee133486aba42f",
          "6532ccd767ee133486aba428",
        ];
        Category.find({ _id: { $in: categoryIds } }, callback);
      },
      new_accessories(callback) {
        Item.find({ category: "65333da238cff7ed9d851d9d" })
          .sort({ createdAt: -1 })
          .populate("category")
          .limit(3)
          .exec(callback);
      },
      new_jerseys(callback) {
        Item.find({ category: "65333da138cff7ed9d851d94" })
          .sort({ createdAt: -1 })
          .populate("category")
          .limit(3)
          .exec(callback);
      },
      new_footwear(callback) {
        Item.find({ category: "65333da238cff7ed9d851d9b" })
          .sort({ createdAt: -1 })
          .populate("category")
          .limit(3)
          .exec(callback);
      },
      best_selling_accessories(callback) {
        Item.find({ category: "65333da238cff7ed9d851d9d" })
          .sort({ name: -1 })
          .limit(1)
          .exec(callback);
      },
      best_selling_footwear(callback) {
        Item.find({ category: "65333da238cff7ed9d851d9b" })
          .sort({ name: -1 })
          .limit(2)
          .exec(callback);
      },
      best_selling_jerseys(callback) {
        Item.find({ category: "65333da138cff7ed9d851d94" })
          .sort({ name: -1 })
          .limit(2)
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      const all = [
        ...results.new_accessories,
        ...results.new_jerseys,
        ...results.new_footwear,
      ];
      const best_selling = [
        ...results.best_selling_accessories,
        ...results.best_selling_footwear,
        ...results.best_selling_jerseys,
      ];
      res.render("index", {
        title: "HoopGear | Home",
        error: err,
        all,
        best_selling,
        new_accessories: results.new_accessories,
        new_jerseys: results.new_jerseys,
        new_footwear: results.new_footwear,
      });
    }
  );
};

module.exports = home_controller;

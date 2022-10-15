const async = require("async");
const Category = require("../models/category");
const Item = require("../models/item");

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
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("index", {
        title: "NBA Store",
        error: err,
        data: results,
      });
    }
  );
};

module.exports = home_controller;

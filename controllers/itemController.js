const Category = require("../models/category");
const Item = require("../models/item");
const ItemInstance = require("../models/iteminstance");

// Display list of all Items
exports.index = (req, res, next) => {
  Item.find({}, "name category")
    .sort({ name: 1 })
    .populate("category")
    .exec((err, list_items) => {
      if (err) {
        return next(err);
      }

      res.render("item_list", { title: "Item List", item_list: list_items });
    });
};

// Display detail page for a specific item
exports.item_detail = (req, res, next) => {};

// Display item create form on GET
exports.item_create_get = (req, res, next) => {};

// Handle book create on POST
exports.item_create_post = (req, res, next) => {};

// Display book update form on GET
exports.item_update_get = (req, res, next) => {};

// Handle book update on POST
exports.item_update_post = (req, res, next) => {};

// Display book delete form on GET
exports.item_delete_get = (req, res, next) => {};

// Handle book delete on POST
exports.item_delete_post = (req, res, next) => {};

const Category = require("../models/category");
const Item = require("../models/item");
const ItemInstance = require("../models/iteminstance");

// Redirect to the home page
exports.index = (req, res, next) => {
  res.redirect("/");
};

// Display detail page for a specific Category
exports.category_detail = (req, res, next) => {
  Item.find({category: req.params.id})
    .sort({ name: 1 })
    .populate("category")
    .exec(function (err, category_detail) {
      if (err) {
        return next(err);
      }

      res.render("category_detail", {
        title: `Category List`,
        category_detail,
      });
    });
};

// Display Category create form on GET
exports.category_create_get = (req, res, next) => {};

// Handle Category create on POST
exports.category_create_post = (req, res, next) => {};

// Display Author update form on GET
exports.category_update_get = (req, res, next) => {
  res.render("category_form", {title: "Create Category"})
};

// Handle Author update on POST
exports.category_update_post = (req, res, next) => {};

// Display Author delete form on GET
exports.category_delete_get = (req, res, next) => {};

// Handle Author delete on POST
exports.category_delete_post = (req, res, next) => {};


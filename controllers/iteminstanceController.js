const Category = require("../models/category");
const Item = require("../models/item");
const ItemInstance = require("../models/iteminstance");

// Display list of all ItemInstances
exports.index = (req, res, next) => {
  ItemInstance.find()
    .populate("item")
    .exec((err, list_iteminstances) => {
      if (err) {
        return next(err);
      }

      // Successful, so render
      res.render("iteminstance_list", {
        title: "Item Instance List",
        iteminstance_list: list_iteminstances,
      });
    });
};

// Display detail page for a specific ItemInstance
exports.iteminstance_detail = (req, res, next) => {
  ItemInstance.findById(req.params.id)
    .populate("item")
    .exec((err, iteminstance) => {
      if (err) {
        return next(err);
      }
      if (iteminstance == null) {
        // No results.
        const err = new Error("Item instance not found");
        err.status = 404;
        return next(err);
      }

      // Successful, so render
      res.render("iteminstance_detail", {
        title: `Instance: ${iteminstance.item.name}`,
        iteminstance,
      });
    });
};

// Display ItemInstance create form on GET
exports.iteminstance_create_get = (req, res, next) => {
  Item.find({}, "name")
    .sort({ name: 1 })
    .exec((err, items) => {
      if (err) {
        return next(err);
      }

      res.render("iteminstance_form", {
        title: "Create ItemInstance",
        item_list: items,
      });
    });
};

// Handle ItemInstance create on POST
exports.iteminstance_create_post = (req, res, next) => {};

// Display ItemInstance update form on GET
exports.iteminstance_update_get = (req, res, next) => {};

// Handle ItemInstance update on POST
exports.iteminstance_update_post = (req, res, next) => {};

// Display ItemInstance delete form on GET
exports.iteminstance_delete_get = (req, res, next) => {};

// Handle ItemInstance delete on POST
exports.iteminstance_delete_post = (req, res, next) => {};

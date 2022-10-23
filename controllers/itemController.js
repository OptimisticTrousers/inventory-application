const Category = require("../models/category");
const Item = require("../models/item");
const ItemInstance = require("../models/iteminstance");
const async = require("async");

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
exports.item_detail = (req, res, next) => {
  async.parallel(
    {
      item(callback) {
        Item.findById(req.params.id).populate("category").exec(callback);
      },
      item_instances(callback) {
        ItemInstance.find({ category: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.item == null) {
        // No results
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
      }

      res.render("item_detail", {
        item: results.item,
        item_instances: results.item_instances,
      });
    }
  );
};

// Display item create form on GET
exports.item_create_get = (req, res, next) => {
  Category.find({})
    .sort({ name: 1 })
    .exec((err, categories) => {
      if (err) {
        return next(err);
      }
      res.render("item_form", {
        title: "Create Item",
        categories,
      });
    });
};

// Handle item create on POST
exports.item_create_post = (req, res, next) => {};

// Display item update form on GET
exports.item_update_get = (req, res, next) => {
  async.parallel(
    {
      item(callback) {
        Item.findById(req.params.id).populate("category").exec(callback);
      },
      categories(callback) {
        Category.find(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.item == null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
      }

      res.render("item_form", {
        title: "Update Item",
        item: results.item,
        categories: results.categories,
      });
    }
  );
};

// Handle book update on POST
exports.item_update_post = (req, res, next) => {};

// Display book delete form on GET
exports.item_delete_get = (req, res, next) => {
  async.parallel(
    {
      item(callback) {
        Item.findById(req.params.id).exec(callback);
      },
      item_instances(callback) {
        ItemInstance.find({ book: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.item_instance == null) {
        res.redirect("/item");
      }
      res.render("item_delete", {
        title: "Delete Item",
        item: results.item,
        item_instances: results.item_instances,
      });
    }
  );
};

// Handle book delete on POST
exports.item_delete_post = (req, res, next) => {};

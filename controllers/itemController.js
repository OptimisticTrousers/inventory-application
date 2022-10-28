const Category = require("../models/category");
const Item = require("../models/item");
const ItemInstance = require("../models/iteminstance");
const async = require("async");
const { body, validationResult } = require("express-validator");

// Display list of all Items
exports.index = (req, res, next) => {
  Item.find({})
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
        title: results.item.name,
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
// exports.item_create_post = (req, res, next) => {}
exports.item_create_post = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },
  // Validate and sanitize fields.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("size").trim().isLength({ min: 1 }).escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Item object with escaped and trimmed data.
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      size: req.body.size,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all categories for form
      Category.find({}, "name").exec(function (err, categories) {
        if (err) {
          return next(err);
        }
        for (let i = 0; i < categories.length; i++) {
          if (item.category.indexOf(categories[i]._id) > -1) {
            categories[i].checked = "true";
          }
        }
        res.render("item_form", {
          title: "Create Item",
          categories,
          item,
          errors: errors.array(),
        });
      });
      return;
    } else {
      // Data from form is valid. Save item.
      item.save(function (err) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new item record.
        res.redirect(item.url);
      });
    }
  },
];

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

      // Success.
      // Mark our selected categories as checked.
      for (let i = 0; i < results.categories.length; i++) {
        for (var j = 0; j < results.item.category.length; j++) {
          if (
            results.categories[i]._id.toString() ===
            results.item.category[j]._id.toString()
          ) {
            results.categories[i].checked = "true";
          }
        }
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
exports.item_update_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },
  // Validate and sanitize fields.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("size").trim().isLength({ min: 1 }).escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create an Item object with escaped/trimmed data and old id.
    const item = new Item({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      category:
        typeof req.body.category === "undefined" ? [] : req.body.category,
      size: req.body.size,
      price: req.body.price,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      Category.find({}).exec(function (err, categories) {
        if (err) {
          return next(err);
        }

        // Mark our selected categories as checked.
        for (let i = 0; i < categories.length; i++) {
          if (item.category.indexOf(categories[i]._id) > -1) {
            categories[i].checked = "true";
          }
        }
        res.render("item_form", {
          title: "Update Item",
          categories,
          item,
          errors: errors.array(),
        });
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      Item.findByIdAndUpdate(req.params.id, item, {}, function (err, theitem) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to book detail page.
        res.redirect(theitem.url);
      });
    }
  },
];

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

      res.render("item_delete", {
        title: "Delete Item",
        item: results.item,
        item_instances: results.item_instances,
      });
    }
  );
};

// Handle book delete on POST
exports.item_delete_post = (req, res, next) => {
  async.parallel(
    {
      item: function (callback) {
        Item.findById(req.body.id).populate("category").exec(callback);
      },
      item_iteminstances: function (callback) {
        ItemInstance.find({ item: req.body.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      if (results.item_iteminstances.length > 0) {
        // Item has item_instances. Render in the same way as for GET route.
        res.render("item_delete", {
          title: "Delete Item",
          item_instances: results.item_iteminstances,
        });
        return;
      } else {
        Item.findByIdAndRemove(req.body.itemid, function deleteItem(err) {
          if (err) {
            return next(err);
          }

          // Success - go to list of Item items.
          res.redirect("/item");
        });
      }
    }
  );
};

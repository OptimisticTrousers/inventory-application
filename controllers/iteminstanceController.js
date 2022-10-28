const Category = require("../models/category");
const Item = require("../models/item");
const ItemInstance = require("../models/iteminstance");
const { body, validationResult } = require("express-validator");
const async = require("async");

// Display list of all ItemInstances
exports.index = (req, res, next) => {
  ItemInstance.find({})
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
  Item.find({})
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
exports.iteminstance_create_post = [
  // Validate and sanitize fields.
  body("item", "Item must be specified").escape(),
  body("size")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("condition").trim().isLength({ min: 1 }).escape(),
  body("available").trim().escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a ItemInstance object with escaped and trimmed data.
    const iteminstance = new ItemInstance({
      item: req.body.item,
      size: req.body.size,
      condition: req.body.condition,
      available: req.body.available,
      picture: req.file,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      Item.find({}).exec(function (err, items) {
        if (err) {
          return next(err);
        }
        // Successful, so render.
        res.render("iteminstance_form", {
          title: "Create ItemInstance",
          item_list: items,
          selected_item: iteminstance.item._id,
          errors: errors.array(),
          iteminstance,
        });
      });
      return;
    } else {
      // Data from form is valid
      iteminstance.save(function (err) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new record.
        res.redirect(iteminstance.url);
      });
    }
  },
];

// Display ItemInstance update form on GET
exports.iteminstance_update_get = (req, res, next) => {
  async.parallel(
    {
      items(callback) {
        Item.find({}).exec(callback);
      },
      iteminstance(callback) {
        ItemInstance.findById(req.params.id).populate("item").exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }

      res.render("iteminstance_form", {
        title: "Update ItemInstance",
        item_list: results.items,
        iteminstance: results.iteminstance,
      });
    }
  );
};

// Handle ItemInstance update on POST
exports.iteminstance_update_post = [
  // Validate and sanitize fields.
  body("item").trim().escape(),
  body("size").optional({ checkFalsy: true }).trim().escape(),
  body("condition").trim().escape(),
  body("available").trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create an ItemInstance object with escaped/trimmed data and current id.
    const iteminstance = new ItemInstance({
      _id: req.params.id,
      item: req.body.item,
      size: req.body.size,
      condition: req.body.condition,
      available: req.body.available,
    });

    if (!errors.isEmpty()) {
      // There are errors so render the form again, passing sanitized values and errors.
      Item.find({}).exec(function (err, items) {
        if (err) {
          return next(err);
        }
        // Successful, so render.
        res.render("iteminstance_form", {
          title: "Create ItemInstance",
          item_list: items,
          selected_item: iteminstance.item._id,
          errors: errors.array(),
          iteminstance,
        });
      });
      return;
    } else {
      // Data from form is valid.
      ItemInstance.findByIdAndUpdate(
        req.params.id,
        iteminstance,
        {},
        function (err, theiteminstance) {
          if (err) {
            return next(err);
          }
          // Successful - redirect to detail page.
          res.redirect(theiteminstance.url);
        }
      );
    }
  },
];

// Display ItemInstance delete form on GET
exports.iteminstance_delete_get = (req, res, next) => {
  ItemInstance.findById(req.params.id)
    .populate("item")
    .exec((err, iteminstance) => {
      if (err) {
        return next(err);
      }
      if (iteminstance == null) {
        // No results
        const err = new Error("Item instance not found");
        err.status = 404;
        return next(err);
      }

      // Successful, so render
      res.render("iteminstance_delete", {
        title: `Copy: ${iteminstance.item.name}`,
        iteminstance,
      });
    });
};

// Handle ItemInstance delete on POST
exports.iteminstance_delete_post = (req, res, next) => {
  // Assume valid ItemInstance id in field.
  ItemInstance.findByIdAndRemove(
    req.body.iteminstanceid,
    function deleteItemInstance(err) {
      if (err) {
        return next(err);
      }

      // Success, so redirect to list of ItemInstance items.
      res.redirect("/iteminstance");
    }
  );
};

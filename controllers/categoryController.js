const async = require("async");
const Category = require("../models/category");
const Item = require("../models/item");
const ItemInstance = require("../models/iteminstance");
const { body, validationResult } = require("express-validator");

// Redirect to the home page
exports.index = (req, res, next) => {
  res.redirect("/");
};

// Display detail page for a specific Category
exports.category_detail = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_items(callback) {
        Item.find({ category: req.params.id }).sort({ name: 1 }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        // No results
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }

      res.render("category_detail", {
        title: results.category.name,
        category: results.category,
        category_items: results.category_items,
      });
    }
  );
};

// Display Category create form on GET
exports.category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
};

// Handle Category create on POST
exports.category_create_post = [
  // Validate and sanitize the name field.
  body("name", "Please enter a category name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Please enter a category description")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanization
  (req, res, next) => {
    // Extract the validation errors from a request.

    const errors = validationResult(req);

    // Create a new category object with escaped and trimmed data
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("category_form", {
        title: "Create Category",
        category,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid.

      // Save category.
      category.save(function (err) {
        if (err) {
          return next(err);
        }

        // Successful - redirect to new category record
        res.redirect(category.url);
      });
    }
  },
];

// Display Author update form on GET
exports.category_update_get = (req, res, next) => {
  Category.findById(req.params.id).exec((err, category) => {
    if (err) {
      return next(err);
    }

    res.render("category_form", {
      title: "Update Category",
      category,
    });
  });
};

// Handle Author update on POST
exports.category_update_post = [
  // Validate and sanitize the name and description field.
  body("name", "Please enter a category name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Please enter a category description")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request

    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render("category_form", {
        title: "Update Category",
        category,
        errors: errors.array(),
      });
      return;
    } else {
      Category.findByIdAndUpdate(
        req.params.id,
        category,
        {},
        function (err, thecategory) {
          if (err) {
            return next(err);
          }
          // Successful - redirect to genre detail page.
          res.redirect(thecategory.url);
        }
      );
    }
  },
];

// Display Author delete form on GET
exports.category_delete_get = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_items(callback) {
        Item.find({ category: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        res.redirect("/");
      }
      res.render("category_delete", {
        title: "Delete Category",
        category: results.category,
        category_items: results.category_items,
      });
    }
  );
};

// Handle Author delete on POST
exports.category_delete_post = (req, res, next) => {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_items: function (callback) {
        Item.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      if (results.category_items.length > 0) {
        res.render("category_delete", {
          title: "Delete Category",
          category: results.category,
          category_items: results.category_items,
        });
        return;
      } else {
        Category.findByIdAndRemove(
          req.body.categoryid,
          function deleteCategory(err) {
            if (err) {
              return next(err);
            }
            // Success - go to category list(ie. homepage)
            res.redirect("/");
          }
        );
      }
    }
  );
};

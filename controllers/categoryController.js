const async = require("async");
const Category = require("../models/category");
const Item = require("../models/item");
const ItemInstance = require("../models/iteminstance");

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
        title: "Category Detail",
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
exports.category_create_post = (req, res, next) => {};

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
exports.category_update_post = (req, res, next) => {};

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
        Category.findById(req.params.id).exec(callback)
      },
      category_items: function(callback) {
        Item.find({category: req.params.id}).exec(callback)
      },
    },
    function (err, results) {
      if(err) {
        return next(err)
      }

      // Success
      if(results.category_items.length > 0) {
        res.render("category_delete", {
          title: "Delete Category",
          category: results.category,
          category_items: results.category_items
        })
        return
      } else {
        Genre.findByIdAndRemove(req.body.id, function deleteCategory(err) {
          if(err) {
            return next(err)
          }
          // Success - go to category list(ie. homepage)
          res.redirect("/")
        })
      }
    }
  )
};

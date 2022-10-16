const Category = require("../models/category");
const Item = require("../models/item")

exports.index = (req, res, next) => {
  res.redirect("/");
};

exports.category_detail = (req, res, next) => {
  Item.find({}, "name").sort({name: 1}).populate("category").exec(function (err, category_detail) {
    if(err) {
      return next(err)
    }

    res.render("category_detail", {title: `Category List`, category_detail})
  })
};

exports.category_update_get = (req, res, next) => {

}

exports.category_update_post = (req, res, next) => {

}

exports.category_delete_get = (req, res, next) => {

}

exports.category_delete_post = (req, res, next) => {

}

exports.category_create_get = (req, res, next) => {

}

exports.category_create_post = (req, res, next) => {

}


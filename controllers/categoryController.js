const Category = require("../models/category");
const Item = require("../models/item")

const index = (req, res, next) => {
  res.redirect("/");
};

const category_detail = (req, res, next) => {
  Item.find({}, "name").sort({name: 1}).populate("category").exec(function (err, category_detail) {
    if(err) {
      return next(err)
    }

    res.render("category_detail", {title: `Category List`, category_detail})
  })
};

const category_update_get = (req, res, next) => {

}

const category_update_post = (req, res, next) => {

}

const category_delete_get = (req, res, next) => {

}

const category_delete_post = (req, res, next) => {

}

const category_create_get = (req, res, next) => {

}

const category_create_post = (req, res, next) => {

}

module.exports = {
  index,
  category_detail,
  category_update_get,
  category_update_post,
  category_delete_get,
  category_delete_post,
  category_create_get,
  category_create_post
};

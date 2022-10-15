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

module.exports = {
  index,
  category_detail,
};

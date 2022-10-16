const Category = require("../models/category")
const Item = require("../models/item")
const ItemInstance = require("../models/iteminstance")

exports.index = (req, res, next) => {

}

exports.iteminstance_detail = (req, res, next) => {

}

exports.iteminstance_create_get = (req, res, next) => {
  Item.find({}, "name").exec((err, items) => {
    if(err) {
      return next(err)
    }

    res.render("iteminstance_form", {
      title: "Create ItemInstance",
      item_list: items
    })
  })
}

exports.iteminstance_create_post = (req, res, next) => {

}

exports.iteminstance_update_get = (req, res, next) => {

}

exports.iteminstance_update_post = (req, res, next) => {

}

exports.iteminstance_delete_get = (req, res, next) => {

}

exports.iteminstance_delete_post = (req, res, next) => {
  
}
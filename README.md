# Inventory Management Application

## Description

[App] Creating an inventory management website for a fake business. Allows users to create, read, update, and delete categories, items, and item instances.

> See it live on [https://rocky-tundra-71808.herokuapp.com/](https://rocky-tundra-71808.herokuapp.com/)
> Or clone repo, cd into repo, then run "npm run devstart"

## Purpose

Creating an Express application using MongoDB, Mongoose and Pug. Learned how Express works with routing, middleware, and rendering. Learned how to use Mongoose to query data. Learned how to use Pug for templating. Using the MVC pattern to design the application. Application generated with the express-application-generator command. https://expressjs.com/en/starter/generator.html

Beyond that, other learning outcomes were:

- Designing reusable views
- Creating and deleting data inside of a MongoDB database
- Using the MVC pattern
- Learning how to validate and sanitize user inputs with express-validator
- Writing POST and GET requests for CRUD operations
- Writing models and querying data with Mongoose
- Using 'multer' middleware to allow users to upload images

## Features

1. Allows users to create categories, items, and item instances
2. Allows users to read categories, items, and item instances
3. Allows users to update categories, items, and item instances
4. Allows users to delete categories, items, and item instances
5. Allows users to upload images
6. Generated with a script, 'populatedb.js' to populate MongoDB database
7. Users can view a list of categories
8. Users can view a list of items
9. Users can view a list of item instances
10. Secured with 'helmet' middleware
11. Space is saved with 'compression' middleware

## Development

### Technologies used

- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Node](https://nodejs.org/en/) - JavaScript runtime
- [Mongoose](https://mongoosejs.com/docs/) - Object Data Model for MongoDB
- [Pug](https://pugjs.org/api/getting-started.html) - A templating engine

## Areas for Improvement

* [ ] Allow users to search for categories, items, and item instances
* [ ] Authentication
* [ ] Use a hamburger menu for navigation
* [ ] Delete images from database once the user deletes that category/item/item instance
* [ ] Verify that the user is sending an image file and not any other type of file
* [ ] Use a better way to generate the 'Size' input field based on the 'Item' input field in the Item Instance creation form. Currently using an inline-script which is a Content Security Policy risk.


## Known Bugs

1. Once a user signs into an account, they can't sign into another account. Might have to do with sessions.

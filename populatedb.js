#! /usr/bin/env node

console.log(
  "This script populates some test categories, and items to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require("async");
const Category = require("./models/category");
const Item = require("./models/item");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const categories = [];
const items = [];

function categoryCreate(name, description, cb) {
  authordetail = { name, description };

  const category = new Category(authordetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(
  name,
  description,
  category,
  price,
  number_in_stock,
  size,
  cb
) {
  const item = new Item({
    name,
    description,
    category,
    price,
    number_in_stock,
    size,
  });

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    cb(null, item);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          "Jerseys",
          "Celebrate your team and your city with the 2021/22 NBA City Edition Jerseys to rep your team in style. We also offer NBA Statement Edition jerseys for your favorite players.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "T-Shirts",
          "Shop for all the latest t-shirts from any of your favorite NBA teams right here at NBAStore.com! Browse our wide collection of exclusive t-shirts from any team in the NBA, including championship t-shirts, name and number tees, and much more. Our collection of t-shirts come in a constiety of styles from short and long sleeved tees to tank tops. No matter if you're looking for shirts or tops for men, women, or kids, you can find any kind of shirt from any NBA team right here at the official online store of the NBA. Place your order on your NBA t-shirt today and be sure to check back later for new arrivals that may be added!",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Hats",
          "Buy NBA team hats from the official online store of the NBA. We carry the latest NBA basketball hats from Mitchell & Ness and New Era. Complete your basketball gear with your favorite NBA team cap. The NBA store offers a wide range of NBA fitted hats, NBA snapback hats, NBA stretchfit hats, novelty hats, and knit hats. Visit us regularly for exclusive online discounts on the latest and hottest NBA hats! Make sure to check NBA hat sizing before you buy a fitted cap!",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Footwear",
          "When you're ready to hit the court, make sure you get your kicks at the official NBA Store! We're your source for the latest and hottest NBA basketball shoes from your favorite stars! Shop the newest arrivals of NBA Jordan Shoes featuring sneakers from Carmelo Anthony, Chris Paul, and Michael Jordan. Or, our Nike Sneaker collection boasts of shoes from LeBron James, Kobe Bryant, and Kevin Durant. Also, don't forget about our selection of new Air Jordan Shoes and Under Armour Footwear featuring new, unique designs. Whether you're looking for the KD VII, LeBron XII, or any other NBA shoe, stay tuned to NBAStore.com for the latest updates.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Accessories",
          "Don't limit your basketball gear to just jerseys and hats! NBA Store is your top source for all the best NBA accessories and gifts as well. Buy NBA jewelry, sunglasses, watches, and so much more featuring your favorite team's logo and colors. Check out the latest electronics like headphones, bluetooth speakers, and covers for your phone, tablet, or laptop, including the latest iPhone and Android phone cases. We have hundreds of accessories for men, women, and kids. You are sure to find the perfect basketball accessory for yourself or as a gift for a loved one at the official online store of the NBA.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Collectibles",
          "Grab the greatest NBA Collectibles from your favorite teams to remember all the greatest moments in NBA history. Enjoy your player Collectibles from the greats like Kobe Bryant, Lebron James, Stephen Curry and more. Get your Signed pictures and autographed jerseys from the hottest NBA players to ever play the game. Browse through and shop for your favorite NBA collectibles from the Official NBA Store.",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Men's Chicago Bulls Zach LaVine Fanatics Branded Red Fast Break Replica Jersey - Icon Edition",
          "We want fans to celebrate their fandom by customizing and personalizing certain products. For these customizable products, including jerseys, we invite customers to tell us how they would like their preferred name or other text to appear by typing that text into the field indicated. However, just because a customer is able to type proposed customization text into the field and is able to complete the order through the website, not all proposed customization text will be accepted. Please note, Fanatics may reject and cancel any customization order for any reason, including for messages that are deemed offensive or inappropriate. Represent your team's distinct on-court look with this Chicago Bulls Fast Break Replica jersey from Fanatics Branded.",
          categories.find((category) => category.name === "Jerseys"),
          55.99,
          10,
          "S  M  L  XL  2XL  3XL  4XL  5XL",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Men's Brooklyn Nets Kevin Durant Fanatics Branded Black 2019/20 Fast Break Replica Jersey - Icon Edition",
          "If you're looking for cutting edge NBA style, then grab this Kevin Durant Brooklyn Nets Fast Break Replica Jersey, which captures the same great look your team sports on the court. This piece boasts vibrant Brooklyn Nets graphics and classic trims that showcase your team's distinct identity. Once you pull this jersey on, your Brooklyn Nets fandom will be proudly on display.",
          categories.find((category) => category.name === "Jerseys"),
          55.99,
          10,
          "S  M  L  XL  2XL  3XL  4XL  5XL",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Men's Golden State Warriors Stephen Curry Jordan Brand Navy 2022/23 Statement Edition Name & Number T-Shirt",
          "Showcase your love for Stephen Curry and the Golden State Warriors with this Statement Edition Name & Number T-shirt from Jordan Brand. It features bold graphics inspired directly by the team's authentic jerseys. Pair this tee with your favorite team shorts or a hat for the ultimate game day look.",
          categories.find((category) => category.name === "T-Shirts"),
          34.99,
          10,
          "XS  S  M  L  XL  2XL  3XL  4XL  5XL",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Men's Los Angeles Lakers Nike Black 2022/23 Legend On-Court Practice Performance T-Shirt",
          "Wear the same style of gear as your favorite Los Angeles Lakers players with this On-Court Practice Legend T-shirt from Nike. It features bold Los Angeles Lakers graphics that stand out against the contrasting fabric. With built-in Dri-FIT technology to wick away moisture, this tee helps you stay dry, fresh and comfortable from tip-off to the final whistle.",
          categories.find((category) => category.name === "T-Shirts"),
          34.99,
          10,
          "XS  S  M  L  XL  2XL  3XL  4XL",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Men's Los Angeles Lakers New Era Cream Color Pop 59FIFTY Fitted Hat",
          "Add a touch of fitted Los Angeles Lakers flair to your collection of stylish gear with this New Era Color Pop 59FIFTY hat. Along with a high crown, this cap offers a structured construction and flat bill for an elevated, street-ready look. Plus, the vibrant Los Angeles Lakers graphics and unique colorway make it the perfect top off to your game day selection.",
          categories.find((category) => category.name === "Hats"),
          31.49,
          10, 
            "6 3/4  6 7/8  7  7 1/8  7 1/4  7 3/8  7 1/2  7 5/8  7 3/4  7 7/8  8  8 1/8  8 1/4",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Men's Los Angeles New Era Born x Raised Black 2020 Dual Champions 59FIFTY Fitted Hat",
          "Los Angeles is for winners. Both the Dodgers and the Lakers overcame each and every obstacle in this unprecedented season, making this year in LA sports history one worth honoring for years to come. Celebrate the reign of the 2020 World Series Champions and the 2020 NBA Finals Champions with this 59FIFTY Fitted Hat. This sweet gear is a special collaboration between New Era and Born x Raised. It features exclusive graphics to show off your excitement for the city of Los Angeles and commemorate this unforgettable moment in LA history.",
          categories.find((category) => category.name === "Hats"),
          54.99,
          10,
            "6 7/8  7  7 1/8  7 1/4  7 3/8  7 1/2  7 5/8  7 3/4  7 7/8  8",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Men's Los Angeles Lakers ISlide Black Tonal Pop Slide Sandals",
          "Show off your team spirit when you get these Los Angeles Lakers Tonal Pop Slide Sandals from ISlide.",
          categories.find((category) => category.name === "Footwear"),
          39.99,
          10,
          "7  8  9  10  11  12  13  14/15",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Men's Los Angeles Lakers FOCO Team Logo Flannel Moccasin Slippers",
          "Keep your feet toasty warm while showing your Los Angeles Lakers pride in these FOCO moccasin slippers. Ideal for lounging at home, the slip-on style and soft flannel lining ensure a comfy fit. The embroidered Los Angeles Lakers logo and eye-catching stitching make every day look like game day.",
          categories.find((category) => category.name === "Footwear"),
          29.99,
          10,
          "S  M  L  XL",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Los Angeles Lakers 24oz. Personalized Jr. Thirst Water Bottle",
          "We want fans to celebrate their fandom by customizing and personalizing certain products. For these customizable products, including jerseys, we invite customers to tell us how they would like their preferred name or other text to appear by typing that text into the field indicated. However, just because a customer is able to type proposed customization text into the field and is able to complete the order through the website, not all proposed customization text will be accepted. Please note, Fanatics may reject and cancel any customization order for any reason, including for messages that are deemed offensive or inappropriate.Give your kitchen cupboard an update with this Los Angeles Lakers 24oz. Personalized Jr. Thirst Water Bottle. The crisp graphics will showcase your love for the Los Angeles Lakers anytime with its sleek design and crisp graphics. This stainless steel drinkware also features a lid with a built in straw, making it the perfect accessory on game days or every day.",
          categories.find((category) => category.name === "Accessories"),
          35.99,
          10,
          undefined,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Men's Los Angeles Lakers Gold Stripe Crew Socks",
          "Showcase your intense Los Angeles Lakers fervor in a fresh way with these remarkable Stripe crew socks!",
          categories.find((category) => category.name === "Accessories"),
          5.99,
          10,
          "L",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Los Angeles Lakers LeBron James NBA x Hasbro Starting Lineup Series 1 Action Figure",
          "Starting Lineup is bouncing back into action with a game-changing line of NBA action figures. This figure features premium design and detail, bringing the legacy of the original 1980s Kenner Starting Lineup figures to today's fans and collectors. Figure comes loaded with accessories, including extra hands, a flight stand, and an exclusive Panini basketball trading card that can only be found with Starting Lineup 6-inch figures. Thanks to modern design and detailing, photoreal technology, and premium articulation, the latest Starting Lineup figures will have fans cheering as they celebrate some of their favorite NBA players with super accurate details and portraits in iconic poses right out of the game!",
          categories.find((category) => category.name === "Collectibles"),
          49.99,
          10,
          undefined,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Autographed Los Angeles Lakers Shaquille O'Neal Fanatics Authentic Mitchell & Ness 1999-2000 Swingman Jersey",
          "Take your collection of Los Angeles Lakers memorabilia to the next level by adding this Shaquille O'Neal autographed Mitchell & Ness 1999-2000 Swingman Jersey. Whether displayed in your home or office, it's the perfect way to highlight your passion for the Los Angeles Lakers for years to come.",
          categories.find((category) => category.name === "Collectibles"),
          262.49,
          10,
          undefined,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("categories: " + categories);
      console.log("items: " + items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);

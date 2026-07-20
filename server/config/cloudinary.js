const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "nknkexsl",
  api_key: "433912931466773",
  api_secret: "3BmPula5XD53ssNJ9Hj721zQN2U",
});

module.exports = cloudinary;
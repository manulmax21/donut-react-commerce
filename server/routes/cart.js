const express = require('express');
const router = express.Router();
const {getAll, addCart, removeOneCart, removeAllFromCart} = require("../controllers/cart");
const {uploadStorageImage} = require("../storage/storageImg");

router.get("/", getAll);
router.delete("/", removeAllFromCart);
router.post("/add", addCart);
router.post("/:id", removeOneCart);

module.exports = router;
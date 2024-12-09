const express = require('express');
const router = express.Router();
const {getAll, addProduct, getOneProduct, getPageProduct, addImageProduct, removeOneProduct, updateName, updateCategory, updateCount, updatePrice} = require("../controllers/products");
const {uploadStorageImage} = require("../storage/storageImg");

router.get("/", getAll);
router.get("/:id", getOneProduct);
router.post("/remove/:id", removeOneProduct);
router.get("/page/:page", getPageProduct);
router.put("/update-name", updateName);
router.put("/update-category", updateCategory);
router.put("/update-price", updatePrice);
router.put("/update-count", updateCount);
router.post("/add", uploadStorageImage.single("image"), addProduct);
router.post("/image", uploadStorageImage.single("image"), addImageProduct);

module.exports = router;
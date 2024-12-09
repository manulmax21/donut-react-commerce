const express = require('express');
const router = express.Router();
const {getOrder, removeOrder, addOrder} = require("../controllers/orders");
const {uploadStorageImage} = require("../storage/storageImg");

router.get("/:id", getOrder);
router.delete("/:id", removeOrder);
router.post("/add", addOrder);

module.exports = router;
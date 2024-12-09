const express = require('express');
const router = express.Router();
const { login, register, current, updateName, updatePassword} = require("../controllers/users");
const { auth } = require('../middleware/auth');

router.post("/login", login);
router.post("/register", register);
router.put("/update-name", updateName);
router.put("/update-password", updatePassword);
router.get("/current", auth, current);

module.exports = router;
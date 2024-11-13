const express = require('express');
const router= express.Router();

const getAllUsers = require('../Controllers/AdminController');
console.log("here is the admin route");
router.route ("/api/admin").get(getAllUsers);
module.exports = router;


const express = require('express');
const router= express.Router();

const {getAllUsers,getCounts} = require('../Controllers/AdminController');
console.log("here is the admin route");
router.route ("/api/admin").get(getAllUsers);
router.route("/api/getMatrics").get(getCounts);
module.exports = router;


const express = require('express');
const {home, register, getAllUsers} = require('../Controlers/user');
const router = express.Router();

router.route("/api/auth").get(home);
router.route("/api/users").get(getAllUsers);
router.route("/api/register").post(register);


module.exports=router;
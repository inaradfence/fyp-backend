const express = require('express');
const {home, register, getAllUsers, loginUser} = require('../Controlers/user');
const router = express.Router();

router.route("/api/login'").post(loginUser);
router.route("/api/auth").get(home);
router.route("/api/users").get(getAllUsers);
router.route("/api/register").post(register);


module.exports=router;
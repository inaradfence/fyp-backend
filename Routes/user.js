const express = require('express');
const { home, register, getAllUsers, loginUser, deleteUser, updateUser } = require('../Controllers/user');
const router = express.Router();

router.route("/api/login").post(loginUser);

router.route("/api/auth").get(home);
router.route("/api/users").get(getAllUsers);
router.route("/api/register").post(register);

// Route for deleting a user
router.route("/api/deleteuser/:id").delete(deleteUser);

// Route for updating a user
router.route("/api/editusers/:id").put(updateUser);

module.exports = router;

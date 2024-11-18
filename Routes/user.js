const express = require("express");
const {
  home,
  register,
  getUserById,
  getAllUsers,
  loginUser,
  deleteUser,
  updateUser,
  updateClientUser,
} = require("../Controllers/user");
const router = express.Router();

router.route("/api/login").post(loginUser);

router.route("/api/auth").get(home);
router.route("/api/users").get(getAllUsers);
router.route("/api/user/:id").get(getUserById);
router.route("/api/register").post(register);

// Route for deleting a user
router.route("/api/deleteuser/:id").get(deleteUser);

// Route for updating a user
router.route("/api/update-user/:id").post(updateUser);

router.route("/api/profile/:id").post(updateClientUser);


module.exports = router;

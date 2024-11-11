const express = require('express');
const router = express.Router();
const { getAllUsers,loginUser, createUser, getUserById, updateUser, deleteUser } =require('../Controlers/user.js');

router.post('/login', loginUser);
router.post('/login', loginUser);

// Get all users
// Get all users
router.get('/users', getAllUsers);

// Create a new user
router.post('/createUser', createUser);

// Middleware to get user by ID
router.use('/users/:id', getUserById);
router.patch('/users/:id', updateUser);
router.get('/users/:id', (req, res) => {
    res.json(res.user);
  });
// Delete a user
router.delete('/users/:id', deleteUser);

module.exports = router;
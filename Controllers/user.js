const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const home = async (req, res) => {
    try {
       return res.render('../Views/Users/manageUsers.ejs');
    } catch (error) {
        console.log("error");
    }
}

const register = async (req, res) => {
  console.log('register here');
  try {
      const { 
          firstname, 
          lastname, 
          email, 
          password, 
          address, 
          designation, 
          institute 
      } = req.body;

      // Check if user already exists
      const userExist = await User.findOne({ email: email });

      if (userExist) {
          return res.status(400).json({ msg: "Email already exists" });
      }

      console.log("User data:", req.body);

      // Create new user
      const userCreated = await User.create({ 
          firstname, 
          lastname, 
          email, 
          password, 
          address, 
          designation, 
          institute 
      });

      console.log("User created successfully.");
          
  } catch (error) {
      console.error("Error:", error);  // Log the full error
      res.status(400).json({ msg: "An error occurred", error: error.message });
  }
};


  const getAllUsers = async (req, res) => {
    try {
        console.log("Fetching all users...");
        const users = await User.find(); // Fetch all users
        res.render('users', { users } );
        console.log(users);

        // res.render('users', { users }); // Render the EJS template with users data
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


  const loginUser = async (req, res) => {
    console.log("login 1");
    const { email, password } = req.body;
    console.log("login 2");
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    console.log("login 3");
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
    console.log("login 4");

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    console.log("login 5");

  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
    console.log("login 6");

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    console.log("login 7");

  
      // Create a JWT token
      const token = jwt.sign(
        
        { id: user._id, email: user.email },
        'your_jwt_secret', // Use a secret key from environment variables
        { expiresIn: '1h' } // Token expiration
      );
      console.log("login 9");
      // Respond with token and user data
      res.json({ token, user: { id: user._id, email: user.email } });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };  

  
  const deleteUser = async (req, res) => {
    console.log("Entering delete function");
    try {
      const userId = req.params.id;
      console.log("User ID to delete:", userId);
  
      // Find the user by ID and delete
      const user = await User.findById(userId);
      console.log("User found");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Delete the user
      await user.delete();  // Explicitly call delete() on the user document
  
      console.log("User deleted successfully");
  
      // Redirect after successful deletion
      res.redirect('/api/users');
    } catch (error) {
      console.error("Error deleting user:", error);
    
    }
  };
  
  const updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const { firstname, lastname, email, address, designation, institute } = req.body;
  
      // Update user information
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { firstname, lastname, email, address, designation, institute },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = { home, register, getAllUsers, loginUser, deleteUser, updateUser };
  
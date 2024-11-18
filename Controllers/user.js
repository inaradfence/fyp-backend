const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtToken = require("../Db/utils/jwttoken");

const home = async (req, res) => {
  try {
    return res.render("../Views/Users/manageUsers.ejs");
  } catch (error) {
    console.log("error");
  }
};

const register = async (req, res) => {
  console.log("register here");
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      address,
      designation,
      institute,
    } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Create new user
    const userCreated = await User.create({
      firstname,
      lastname,
      email,
      password,
      address,
      designation,
      institute,
    });

    console.log("User created successfully.");
    res.status(200).json({ msg: "User created successfully", userCreated });
  } catch (error) {
    console.error("Error:", error); // Log the full error
    res.status(400).json({ msg: "An error occurred", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    console.log("Fetching all users...");
    const users = await User.find(); // Fetch all users
    res.render("users", { users });
    console.log(users);

    // res.render('users', { users }); // Render the EJS template with users data
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log("login successful");

    // jwtToken (user, 200, res);
    // Create a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "your_jwt_secret", // Use a secret key from environment variables
      { expiresIn: "1h" } // Token expiration
    );

    // Respond with token and user data
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstname: user?.firstname,
        lastname: user?.lastname,
        designation: user?.designation,
        institute: user?.institute,
        address: user?.address,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  console.log("Entering delete function");
  try {
    console.log("User ID to delete:", req.params.id);
    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(req.params.id);
    console.log("User found");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const users = await User.find(); // Fetch all users
    res.render("users", { users });
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const getUserById = async (req, res) => {
  console.log("Fetching user by ID...");
  try {
    const user = await User.findById(req.params.id); // Fetch user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    res.render("updateuser", { user }); // Render the EJS template with user data
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserByIdJson = async (req, res) => {
  console.log("Fetching user by ID...");
  try {
    const user = await User.findById(req.params.id); // Fetch user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    res.render("updateuser", { user }); // Render the EJS template with user data
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  console.log("you will update here");
  try {
    const { firstname, lastname, email, address, designation, institute } =
      req.body;
    console.log("Request body:", req.params);
    // Update user information
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email, address, designation, institute },
      { new: true } // Return the updated document
    );
    console.log("updated data", updateUser);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const users = await User.find(); // Fetch all users
     res.render("users", { users });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateClientUser = async (req, res) => {
  console.log('request is here')
  try {
    const { firstname, lastname, email, address, designation, institute } =
      req.body;
    console.log("Request body:", req.params);
    console.log("Request body:", req.body);
    // Update user information
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email, address, designation, institute },
      { new: true } // Return the updated document
    );
    console.log("updated data", updateUser);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    //const users = await User.find(); // Fetch all users
    res.status(200).json({ message: 'User is updated' });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  home,
  register,
  getAllUsers,
  getUserById,
  loginUser,
  deleteUser,
  updateUser,
  getUserByIdJson,
  updateClientUser,
};

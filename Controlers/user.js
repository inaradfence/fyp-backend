const User = require('../modles/user');
// const cors = require('cors');
// app.use(cors());  // This allows cross-origin requests

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
    console.log("Users");
      const users = await User.find();
      res.json(users);
    // console.log(contacts);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

module.exports = { home, register, getAllUsers };

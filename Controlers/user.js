const User = require('../Models/user');

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

// const getAllUsers = async (req, res) => {
    // try {
    // console.log("Users");
  //     const users = await User.find();
  //     res.json(users);
  //   // console.log(contacts);
  
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // };

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
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Create a JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        'your_jwt_secret', // Use a secret key from environment variables
        { expiresIn: '1h' } // Token expiration
      );
  
      // Respond with token and user data
      res.json({ token, user: { id: user._id, email: user.email } });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };  
   

module.exports = { home, register, getAllUsers, loginUser };

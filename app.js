const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require("./Routes/user");
const contactRoutes=require("./Routes/Contact");
const projectRoutes=require("./Routes/Project");


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const mongoURI = "mongodb://localhost:27017/Fyp";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', userRoutes);
app.use('/contact',contactRoutes);
app.use('/project',projectRoutes);
// Your routes go here
// const userRoutes = require('./routes/users'); // Example
// app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port} `);
});
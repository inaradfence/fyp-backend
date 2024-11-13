const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const connectDb= require('./Db/config');
const router = require("./Routes/user");
const ContactsController = require("./Routes/Contact");
const AdminRoute = require("./Routes/Admin");
const projectRoute = require ("./Routes/Project");
const CourseRoute = require ("./Routes/Course");
const CollegeRoute = require ("./Routes/College");
const Announcement = require ("./Routes/Announcement");
const routes = require('./Routes/routes'); // Import your routes
const cookieParser = require('cookie-parser'); // Add cookie-parser

app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/', routes); // Mount your routes

// ########################################################################

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Restrict to specific domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

//.......Admin Routes...........

app.get("/api/admin", AdminRoute);
app.get("/api/auth", router);
app.get("/getContact", ContactsController );
app.get("/api/projects", projectRoute);
app.get("/api/users", router);
app.get("/api/courses", CourseRoute);
app.get("/getAnnouncement", Announcement);

// app.get("/api/colleges", CollegeRoute);
app.get("/api/colleges", (req, res) => {
  res.render('addcollege'); 
});

app.get("/api/createCourse", (req, res) => {
  res.render('addcourse'); 
});


//...........Post..........
app.post("/api/register", router);
app.post("/api/login", router);
app.post("/api/contact", ContactsController);
app.post("/api/projects", projectRoute);
app.post("/api/createCourse", CourseRoute);
app.post("/createAnnouncement", Announcement);
// app.post("/api/colleges", CollegeRoute);

app.post('/api/colleges', (req, res) => {
  const newCourseData = req.body; // Access form data (make sure body-parser is set up)

  //  res.redirect('/'); 
  console.log("aaaaaaaaaaaa");
});

//...........Frontend..........
app.get("/api/all-courses", CourseRoute);






connectDb().then(()=>{
  const PORT=5000;
  app.listen(PORT, ()=>{
      console.log(`port: ${PORT}`);
  });
  });

  // .................................................................



const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser'); // Add cookie-parser
const connectDb= require('./Db/config');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); //

// import Routes
const router = require("./Routes/user");
const ContactsController = require("./Routes/Contact");
const AdminRoute = require("./Routes/Admin");
const projectRoute = require ("./Routes/Project");
const CourseRoute = require ("./Routes/Course");
const CollegeRoute = require ("./Routes/College");
const Announcement = require ("./Routes/Announcement");
const Cards = require ("./Routes/HomeCards");
const routes = require('./Routes/routes'); // Import your routes


app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/', routes); // Admin Route

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Restrict to specific domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

//.......Admin Routes...........

app.get("/getContact", ContactsController );
app.get("/contact-us/:id", ContactsController );  //show editpage

app.get("/api/projects", projectRoute);
app.get("/api/project/:id", projectRoute);  //show editpage

app.get("/api/users", router);
app.get("/api/user/:id", router);  //show editpage

app.get("/api/courses", CourseRoute);
app.get("/api/courses/:id", CourseRoute);   //show editpage

app.get("/api/getCards", Cards);
app.get("/api/cards/:id", Cards);  //show editupdate

app.get("/getAnnouncement", Announcement);
app.get("/Announcement/:id", Announcement);//editpage

app.get("/api/colleges", CollegeRoute);
app.get("/api/college/:id", CollegeRoute); //edit page


//................ create ..............

app.get("/api/createCards", (req, res) => {
  res.render('addcards'); 
});
app.get("/api/createAnnouncement", (req, res) => {
  res.render('addannouncement'); 
});
app.get("/api/createColleges", (req, res) => {
  res.render('addcollege'); 
});

app.get("/api/createCourse", (req, res) => {
  res.render('addcourse'); 
});



//...........Post..........
app.post("/api/register", router);
app.post("/api/login", router);
app.post("/api/contact", ContactsController);
// app.post("/api/projects", projectRoute);
app.post('/api/projects', upload.single('file'), projectRoute);
app.post("/api/createCourse", CourseRoute);
app.post("/api/createAnnouncement", Announcement);
app.post("/api/createColleges", CollegeRoute);
app.post("/api/createCards", Cards);


//Edit and Delete
app.post("/api/update-courses/:id", CourseRoute);
app.get("/api/deletecourses/:id", CourseRoute);
app.post("/api/update-project/:id", projectRoute);
app.get("/api/delete-project/:id", projectRoute);
app.post("/api/update-user/:id", router);
app.get("/api/deleteuser/:id", router);
app.post("/update-contact/:id", ContactsController);
app.get("/delete-contact/:id", ContactsController);
app.post("/updateAnnouncement/:id", Announcement);
app.get("/updateAnnouncement/:id", Announcement);
app.post("/update-card/:id", Cards);
app.get("/deletecard/:id", Cards);
app.post("/api/update-college/:id", CollegeRoute); 
app.get("/api/delete-college/:id", CollegeRoute); 



//...........Frontend..........
app.get("/api/all-courses", CourseRoute);
app.get("/api/all-courses/:id", CourseRoute);
app.get("/api/all-Announcement", Announcement);
app.get("/api/all-Cards", Cards);
app.get("/api/showprojects", projectRoute);






connectDb().then(()=>{
  const PORT=5000;
  app.listen(PORT, ()=>{
      console.log(`port: ${PORT}`);
  });
  });

  // .................................................................



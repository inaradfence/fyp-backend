const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const connectDb= require('./Db/config');
const router = require("./Routes/user");
const ContactsController = require("./Routes/Contact");
const AdminRoute = require("./Routes/Admin");
const projectRoute = require ("./Routes/Project");
const CourseRoute = require ("./Routes/Courses");
const routes = require('./Routes/routes'); // Import your routes
const cookieParser = require('cookie-parser'); // Add cookie-parser

app.set("view engine", "ejs");
app.set("Views", path.resolve("./Views"));
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
app.get("/getContact", ContactsController );
app.get("/api/projects", projectRoute);
app.get("/api/users", router);
app.get("/api/courses", CourseRoute);



//...........Frontend..........
app.get("/api/auth", router);
app.post("/api/register", router);
app.post("/api/contact", ContactsController);
app.post("/api/projects", projectRoute);
app.post("/api/courses", CourseRoute);


connectDb().then(()=>{
  const PORT=5000;
  app.listen(PORT, ()=>{
      console.log(`port: ${PORT}`);
  });
  });

  // .................................................................



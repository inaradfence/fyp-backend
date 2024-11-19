const express = require("express");
const User = require("../Models/user");
const College = require("../Models/College");
const Course = require("../Models/Course");
const Project = require("../Models/Project");
const Admin = require;
async function addAdmin(name, email, password, picture, bio) {
  try {
    // Create a new admin document
    const newAdmin = new Admin({
      name: name,
      email: email,
      password: password,
      picture: picture,
      bio: bio,
    });

    // Save the new admin document to the database
    await newAdmin.save();
    console.log("Admin saved successfully");
  } catch (err) {
    console.error("Error saving admin:", err);
    throw err; // Propagate the error
  }
}

const getAllUsers = async (req, res) => {
  console.log("here is the admin controller");

  try {
    console.log("users");
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "NO Users Found" });
    }
    console.log(users);
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getCounts = async (req, res, next) => {
  console.log('here is me ')
  try {
    // Fetch counts for each model
    const userCount = await User.countDocuments();
    const collegeCount = await College.countDocuments();
    const courseCount = await Course.countDocuments();
    const projectCount = await Project.countDocuments();

    // Send counts in the response
  res.render("dashboard", {
      users: userCount ? userCount:0,
      colleges: collegeCount ? collegeCount:0,
      courses: courseCount ? courseCount:0,
      projects: projectCount ? projectCount:0,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getCounts };
// module.exports = addAdmin;

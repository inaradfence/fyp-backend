const express = require('express');
const router = express.Router();

const { createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse} = require ("../Controlers/Courses");


    router.route("/api/courses").get(getAllCourses);
    // router.route("/api/courses/:id").get(getCourseById);
    router.route("/api/courses").post(createCourse);
    router.route("/api/courses/:id").patch(updateCourse);
    router.route("/api/courses/:id").delete(deleteCourse);
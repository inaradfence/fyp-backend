const express = require('express');
const router = express.Router();

const { createCourse,
    getAllCoursesJson,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse} = require ("../Controllers/Course");


    router.route("/api/courses").get(getAllCourses);
    router.route("/api/all-courses").get(getAllCoursesJson); //frontend route
    router.route("/api/all-courses/:id").get(getAllCoursesJson); //frontend route
    router.route("/api/courses/:id").get(getCourseById);
    router.route("/api/createCourse").get(createCourse);
    router.route("/api/createCourse").post(createCourse);
    // router.route("/api/updatecourses/:id").get(updateCourse);
    router.route("/api/update-courses/:id").post(updateCourse);
    router.route("/api/deletecourses/:id").get(deleteCourse);

    
module.exports = router;
const express = require('express');
const router = express.Router();

const { createCourse,
    getAllCoursesJson,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse} = require ("../Controllers/Course");


    router.route("/api/courses").get(getAllCourses);
    router.route("/api/all-courses").get(getAllCoursesJson);
    router.route("/api/courses/:id").get(getCourseById);
    router.route("/api/createCourse").get(createCourse);
    router.route("/api/createCourse").post(createCourse);
    router.route("/api/courses/:id").patch(updateCourse);
    router.route("/api/courses/:id").delete(deleteCourse);

    
module.exports = router;
const Course = require('../Models/Course');

// Controller to handle creating a new course
const createCourse = async (req, res) => {
  try {
    const { courseTitle, description } = req.body;
    console.log("Request body:", req.body); // Log to check if body is received

    const newCourse = new Course({
      courseTitle,
      description,
    });

    const savedCourse = await newCourse.save();
    console.log("Saved course:", savedCourse);
    res.redirect("/api/courses");
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ message: 'Failed to create course', error });
  }
};

// Controller to get all courses
const getAllCourses = async (req, res) => {
  try {
    console.log("courses are here");
    const courses = await Course.find();
    res.render('courses', { courses } );
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve courses', error });
  }
};

const getAllCoursesJson = async (req, res) => {
  try {
    console.log("courses are here");
    const courses = await Course.find();
    res.status(200).json(courses);

  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve courses', error });
  }
};

// Controller to get a single course by ID
const getCourseById = async (req, res) => {
  console.log("getCourseById here", req.params);
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    console.log(course);
    res.render('updatecourse',{course});

  console.log("rendered");


  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve course', error });
  }
};

// Controller to update a course by ID
const updateCourse = async (req, res) => {
  console.log("you will update here");
  try {
    const { courseTitle, description} = req.body;
    console.log("Request body:", req.params);
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { courseTitle, description },
      { new: true }
    );
    console.log("update course", updateCourse);
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const courses = await Course.find();
    res.render('courses', { courses } );
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ message: 'Failed to update course', error });
  }
};

// Controller to delete a course by ID
const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const courses = await Course.find();
    res.render('courses', { courses } );
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course', error });
  }
};

// Export all functions at once
module.exports = {
  getAllCoursesJson,
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};

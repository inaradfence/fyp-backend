
const College = require('../Models/College');
const Course = require('../Models/Course');

const createCollege = async (req, res) => {
  try {
      console.log("beforre adding data"); // Log to see what data is received
      const { collegeName, location,  course } = req.body;
      console.log("after adding data", req.body);
      const newCollege = new College({
          collegeName,
          location,
          course
      });
      console.log("before storing data", newCollege);
      await newCollege.save();
      console.log("data is stored");
      res.redirect("/api/colleges");
  } catch (error) {
      console.error("Error creating college:", error);
      res.status(500).json({ message: 'Failed to create college', error });
  }
};




// Controller to get all colleges
const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find(); // Populates course with course details
    res.render("colleges", {colleges});
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve colleges', error });
  }
};

// Controller to get a single college by ID
const getCollegeById = async (req, res) => {
  console.log("getCollegeById here", req.params);
  try {
    // Populate 'course' instead of 'courses' as per your schema
    const college = await College.findById(req.params.id).populate('course'); 
    const allCourses = await Course.find();
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    console.log(college);
    res.render('updatecollege', { college, allCourses });
    console.log("rendered");
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve college', error });
  }
};


// Controller to update a college by ID
const updateCollege = async (req, res) => {
  try {
    const { collegeName, location, course } = req.body;

    // Fetch the current college data to update only the courses
    const currentCollege = await College.findById(req.params.id);

    if (!currentCollege) {
      return res.status(404).json({ message: 'College not found' });
    }

    // Add new courses to the existing ones (preserving the old courses)
    const updatedCourses = [...new Set([...currentCollege.course, ...course])];  // Merge and remove duplicates

    // Update the college with the new data
    const updatedCollege = await College.findByIdAndUpdate(
      req.params.id,
      { collegeName, location, course: updatedCourses },
      { new: true }
    );

    if (!updatedCollege) {
      return res.status(404).json({ message: 'Failed to update college' });
    }

    console.log("Updated College: ", updatedCollege);
    const colleges = await College.find().populate('course'); // Fetch colleges with populated course details
    res.render("colleges", { colleges });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update college', error });
  }
};


// Controller to delete a college by ID
const deleteCollege = async (req, res) => {
  try {
    const deletedCollege = await College.findByIdAndDelete(req.params.id);

    if (!deletedCollege) {
      return res.status(404).json({ message: 'College not found' });
    }
    const colleges = await College.find(); // Populates course with course details
    res.render("colleges", {colleges});
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete college', error });
  }
};
const getAllCollegeJson = async (req, res) => {
  try {
    const collegeId = req.params.collegeId; // College ID (from the URL parameter)

    if (collegeId) {
      // Fetch courses for a specific college by its ID
      const college = await College.findById(collegeId).populate('course'); // Populate with course data
      
      if (!college) {
        return res.status(404).json({ message: 'College not found.' });
      }

      return res.status(200).json({ type: 'courses', data: college.course });
    } else {
      // Fetch all colleges with their courses
      const colleges = await College.find().populate('course'); // Populate course field with course data
      
      if (!colleges.length) {
        return res.status(404).json({ message: 'No colleges found.' });
      }

      return res.status(200).json({ type: 'colleges', data: colleges });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve data', error });
  }
};
// Export all functions as an object
module.exports = {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
  getAllCollegeJson
};


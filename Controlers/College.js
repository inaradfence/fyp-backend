const College = require('../models/College');

// Controller to create a new college
const createCollege = async (req, res) => {
  try {
    const { collegeName, city, courses } = req.body;

    const newCollege = new College({
      collegeName,
      city,
      courses,
    });

    const savedCollege = await newCollege.save();
    res.status(201).json(savedCollege);
    console.log("college saved");
  } catch (error) {
    res.status(500).json({ message: 'Failed to create college', error });
  }
};

// Controller to get all colleges
const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find().populate('courses'); // Populates courses with course details
    // res.status(200).json("colleges");
    res.render("colleges", {colleges});
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve colleges', error });
  }
};

// Controller to get a single college by ID
const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id).populate('courses');

    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve college', error });
  }
};

// Controller to update a college by ID
const updateCollege = async (req, res) => {
  try {
    const { collegeName, city, courses } = req.body;

    const updatedCollege = await College.findByIdAndUpdate(
      req.params.id,
      { collegeName, city, courses },
      { new: true }
    );

    if (!updatedCollege) {
      return res.status(404).json({ message: 'College not found' });
    }

    res.status(200).json(updatedCollege);
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

    res.status(200).json({ message: 'College deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete college', error });
  }
};

// Export all functions as an object
module.exports = {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
};

// const College = require('../Models/College');

// Controller to create a new college
// const createCollege = async (req, res) => {
//   console.log("1");
//   try {
//     const { , city, courses } = req.body;
//     console.log("2", req.body);

//     const newCollege = new College({
//       collegeName,
//       city,
//       courses,
//     });
   
//     console.log("3", newCollege);
//     const savedCollege = await newCollege.save();
//     console.log("college saved");
//     res.redirect("/api/colleges")
//     console.log("college saved");
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create college', error });
//   }
// };

const College = require('../Models/College');

const createCollege = async (req, res) => {
  try {
      console.log("beforre adding data"); // Log to see what data is received
      const { collegeName, city, course } = req.body;
      console.log("after adding data", req.body);
      const newCollege = new College({
          collegeName,
          city,
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
    const colleges = await College.find(); // Populates courses with course details
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
    const { collegeName, city, course } = req.body;

    const updatedCollege = await College.findByIdAndUpdate(
      req.params.id,
      { collegeName, city, course },
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

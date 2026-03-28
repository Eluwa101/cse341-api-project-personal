const { ObjectId } = require("mongodb");
const { getDb } = require("../data/dbconnect");

const getAllCourses = async (req, res) => {
  // swagger.tags = ["Courses"];
  try {
    const db = getDb();
    const data = await db.collection("courses").find({}).toArray();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getSingleCourse = async (req, res) => {
  // swagger.tags = ["Courses"];
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing id route parameter." });
    }

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      return res.status(400).json({ message: "Invalid id format." });
    }

    const db = getDb();
    const data = await db.collection("courses").findOne({ _id: objectId });

    if (!data) {
      return res.status(404).json({ message: "No data found." });
    }

    return res.json(data);
  } catch (error) {
    console.error("Error fetching course by id:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const createCourse = async (req, res) => {
  // swagger.tags = ["Courses"];
  try {
    const courseId = new ObjectId();
    const course = {
      title: req.body.title,
      description: req.body.description,
      instructorId: req.body.instructorId,
      level: req.body.level,
      price: req.body.price,
      lessonsCount: req.body.lessonsCount,
      rating: req.body.rating,
      enrolledStudents: req.body.enrolledStudents
    };

    const response = await getDb().collection("courses").insertOne({ _id: courseId, ...course });
    if (response.acknowledged && response.insertedId) {
      return res.status(201).json({ message: "Course created successfully." });
    }
    return res.status(500).json({ message: "Failed to create course." });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const updateCourse = async (req, res) => {
  // swagger.tags = ["Courses"];
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing id route parameter." });
    }

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      return res.status(400).json({ message: "Invalid id format." });
    }

    const updatedCourse = {
      title: req.body.title,
      description: req.body.description,
      instructorId: req.body.instructorId,
      level: req.body.level,
      price: req.body.price,
      lessonsCount: req.body.lessonsCount,
      rating: req.body.rating,
      enrolledStudents: req.body.enrolledStudents
    };
    const response = await getDb().collection("courses").updateOne({ _id: objectId }, { $set: updatedCourse });
    if (response.modifiedCount > 0) {
      return res.json({ message: "Course updated successfully." });
    }
    return res.status(500).json({ message: "Failed to update course." });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const deleteCourse = async (req, res) => {
  // swagger.tags = ["Courses"];
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing course id in the route parameter." });
    }

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      return res.status(400).json({ message: "Invalid id format." });
    }

    const response = await getDb().collection("courses").deleteOne({ _id: objectId });
    if (response.deletedCount > 0) {
      return res.json({ message: "Course deleted successfully." });
    }
    return res.status(500).json({ message: "Failed to delete course." });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse
};

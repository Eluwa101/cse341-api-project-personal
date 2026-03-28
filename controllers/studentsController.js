const { ObjectId } = require("mongodb");
const { getDb } = require("../data/dbconnect");

const getAllStudents = async (req, res) => {
  // swagger.tags = ["Students"];
  try {
    const db = getDb();
    const data = await db.collection("students").find({}).toArray();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getSingleStudent = async (req, res) => {
  // swagger.tags = ["Students"];
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
    const data = await db.collection("students").findOne({ _id: objectId });

    if (!data) {
      return res.status(404).json({ message: "No data found." });
    }

    return res.json(data);
  } catch (error) {
    console.error("Error fetching student by id:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const createStudent = async (req, res) => {
  // swagger.tags = ["Students"];
  try {
    const studentId = new ObjectId();
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      course: req.body.course
    };

    const response = await getDb().collection("students").insertOne({ _id: studentId, ...student });
    if (response.acknowledged && response.insertedId) {
      return res.status(201).json({ message: "Student created successfully." });
    }
    return res.status(500).json({ message: "Failed to create student." });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const updateStudent = async (req, res) => {
  // swagger.tags = ["Students"];
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

    const updatedStudent = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      course: req.body.course
    };
    const response = await getDb().collection("students").updateOne({ _id: objectId }, { $set: updatedStudent });
    if (response.modifiedCount > 0) {
      return res.json({ message: "Student updated successfully." });
    }
    return res.status(500).json({ message: "Failed to update student." });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


const deleteStudent = async (req, res) => {
  // swagger.tags = ["Students"];
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing student id in the route parameter." });
    }

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      return res.status(400).json({ message: "Invalid id format." });
    }

    const response = await getDb().collection("students").deleteOne({ _id: objectId });
    if (response.deletedCount > 0) {
      return res.json({ message: "Student deleted successfully." });
    }
    return res.status(500).json({ message: "Failed to delete student." });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};



module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent
};

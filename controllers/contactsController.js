const { ObjectId } = require("mongodb");
const { getDb } = require("../data/dbconnect");

const getAll = async (req, res) => {
  try {
    const db = getDb();
    const data = await db.collection("contacts").find({}).toArray();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getSingle = async (req, res) => {
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
    const data = await db.collection("contacts").findOne({ _id: objectId });

    if (!data) {
      return res.status(404).json({ message: "No data found." });
    }

    return res.json(data);
  } catch (error) {
    console.error("Error fetching contact by id:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getAll,
  getSingle
};

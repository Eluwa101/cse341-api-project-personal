const { getDb } = require("../data/dbconnect");

const getProfessionalData = async (req, res) => {
  try {
    const db = getDb();
    const data = await db.collection("professional").findOne({});

    if (!data) {
      return res.status(404).json({ message: "No data found." });
    }

    return res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getProfessionalData
};

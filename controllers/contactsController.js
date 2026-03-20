const { ObjectId } = require("mongodb");
const { getDb } = require("../data/dbconnect");

const getAll = async (req, res) => {
  // swagger.tags = ["Contacts"];
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
  // swagger.tags = ["Contacts"];
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

const createContact = async (req, res) => {
  // swagger.tags = ["Contacts"];
  const userId = new ObjectId();
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await getDb().collection("contacts").insertOne({ _id: userId, ...user });
  if (response.acknowledged && response.insertedId) {
    return res.status(201).json({ message: "Contact created successfully." });
  }
  return res.status(500).json({ message: "Failed to create contact." });
};

const updateContact = async (req, res) => {
  // swagger.tags = ["Contacts"];
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

  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await getDb().collection("contacts").updateOne({ _id: objectId }, { $set: updatedContact });
  if (response.modifiedCount > 0) {
    return res.json({ message: "Contact updated successfully." });
  }
  return res.status(500).json({ message: "Failed to update contact." });
};


const deleteContact = async (req, res) => {
  // swagger.tags = ["Contacts"];
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Missing contact id in the route parameter." });
  }

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (error) {
    return res.status(400).json({ message: "Invalid id format." });
  }

  const response = await getDb().collection("contacts").deleteOne({ _id: objectId });
  if (response.deletedCount > 0) {
    return res.json({ message: "Contact deleted successfully." });
  }
  return res.status(500).json({ message: "Failed to delete contact." });
};



module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};

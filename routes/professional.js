const express = require("express");
const router = express.Router();

const professionalController = require("../controllers/professionalController");

router.get("/", professionalController.getProfessionalData);

module.exports = router;
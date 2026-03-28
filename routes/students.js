const express = require("express");
const router = express.Router();

const studentsController = require("../controllers/studentsController");
const { studentValidationRules, validate } = require("../middleware/validators");

router.get("/", studentsController.getAllStudents);
router.get("/:id", studentsController.getSingleStudent);
router.post("/", studentValidationRules, validate, studentsController.createStudent);
router.put("/:id", studentValidationRules, validate, studentsController.updateStudent);
router.delete("/:id", studentsController.deleteStudent);

module.exports = router;

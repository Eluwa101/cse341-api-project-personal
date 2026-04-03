const express = require("express");
const router = express.Router();

const studentsController = require("../controllers/studentsController");
const { studentValidationRules, validate } = require("../middleware/validators");
const isAuthenticated = require("../middleware/authenticate");

router.get("/", studentsController.getAllStudents);
router.get("/:id", studentsController.getSingleStudent);
router.post("/",isAuthenticated, studentValidationRules, validate, studentsController.createStudent);
router.put("/:id", isAuthenticated, studentValidationRules, validate, studentsController.updateStudent);
router.delete("/:id", isAuthenticated, studentsController.deleteStudent);

module.exports = router;

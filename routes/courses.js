const express = require("express");
const router = express.Router();

const coursesController = require("../controllers/coursesController");
const { courseValidationRules, validate } = require("../middleware/validators");
const isAuthenticated = require("../middleware/authenticate");

router.get("/", coursesController.getAllCourses);
router.get("/:id", coursesController.getSingleCourse);
router.post("/", isAuthenticated, courseValidationRules, validate, coursesController.createCourse);
router.put("/:id", isAuthenticated, courseValidationRules, validate, coursesController.updateCourse);
router.delete("/:id", isAuthenticated, coursesController.deleteCourse);

module.exports = router;

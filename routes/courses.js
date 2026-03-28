const express = require("express");
const router = express.Router();

const coursesController = require("../controllers/coursesController");
const { courseValidationRules, validate } = require("../middleware/validators");

router.get("/", coursesController.getAllCourses);
router.get("/:id", coursesController.getSingleCourse);
router.post("/", courseValidationRules, validate, coursesController.createCourse);
router.put("/:id", courseValidationRules, validate, coursesController.updateCourse);
router.delete("/:id", coursesController.deleteCourse);

module.exports = router;

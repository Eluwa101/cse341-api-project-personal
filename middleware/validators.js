const { body, validationResult } = require("express-validator");

const studentValidationRules = [
  body("firstName")
    .notEmpty().withMessage("firstName is required")
    .isString().withMessage("firstName must be a string"),

  body("lastName")
    .notEmpty().withMessage("lastName is required")
    .isString().withMessage("lastName must be a string"),

  body("email")
    .notEmpty().withMessage("email is required")
    .isEmail().withMessage("email must be valid"),

  body("phone")
    .notEmpty().withMessage("phone is required"),

  body("role")
    .notEmpty().withMessage("role is required"),

  body("city")
    .notEmpty().withMessage("city is required"),

  body("state")
    .notEmpty().withMessage("state is required"),

  body("country")
    .notEmpty().withMessage("country is required"),

  body("course")
    .notEmpty().withMessage("course is required")
];


const courseValidationRules = [
  body("title")
    .notEmpty().withMessage("title is required"),

  body("description")
    .notEmpty().withMessage("description is required"),

  body("instructorId")
    .notEmpty().withMessage("instructorId is required"),

  body("level")
    .notEmpty().withMessage("level is required"),

  body("price")
    .notEmpty().withMessage("price is required")
    .isFloat({ min: 0 }).withMessage("price must be a number"),

  body("lessonsCount")
    .notEmpty().withMessage("lessonsCount is required")
    .isInt({ min: 0 }).withMessage("lessonsCount must be an integer"),

  body("rating")
    .notEmpty().withMessage("rating is required")
    .isFloat({ min: 0, max: 5 }).withMessage("rating must be between 0 and 5"),

  body("enrolledStudents")
    .notEmpty().withMessage("enrolledStudents is required")
    .isInt({ min: 0 }).withMessage("enrolledStudents must be an integer")
];


const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array()
    });
  }

  next();
};

module.exports = {
  studentValidationRules,
  courseValidationRules,
  validate
};
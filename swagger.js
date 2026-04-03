const swaggerAutoGen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Students & Courses API",
    description: "API for managing students and courses"
  },
  host: "localhost:8080",
  basePath: "/",
  schemes: ["http", "https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutoGen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.js");
});

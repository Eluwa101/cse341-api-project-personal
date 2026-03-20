const swaggerAutoGen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "A simple Contacts API"
  },
  host: "localhost:8080",
  basePath: "/contacts",
  schemes: ["http", "https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contacts.js"];

swaggerAutoGen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.js");
});

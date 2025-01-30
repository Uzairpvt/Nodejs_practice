const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/Config/db");
const userRoutes = require("./src/routes/userRoutes");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

dotenv.config();
const app = express();

// Swagger definition
const swaggerOptions = {
    definition: {
      openapi: "3.0.0", // OpenAPI version
      info: {
        title: "Node.js API Documentation",
        version: "1.0.0",
        description: "API documentation for our Node.js project",
      },
      servers: [
        {
          url: "http://localhost:3400/api", // Update this as per your environment
        },
      ],
    },
    apis: ["./src/routes/userRoutes*.js"], // Path to API route files
  };
  
  // Initialize Swagger
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Start Server
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`),
 console.log(`Swagger docs available at http://localhost:${PORT}/swagger`)
);

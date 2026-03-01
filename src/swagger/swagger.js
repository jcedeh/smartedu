import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "API for user registration and login",
    },
    servers: [
      { url: "https://smartedu-cu15.onrender.com/" } // replace with your Render URL
    ]
  },
  apis: ["./routes/*.js"], // Swagger comments in routes
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);
export default swaggerUi;
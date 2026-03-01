import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
    },
    servers: [
      { url: "https://smartedu-cu15.onrender.com" }
    ],

    components: {
      schemas: {
        RegisterUser: {
          type: "object",
          required: ["email", "password", "role"],
          properties: {
            email: {
              type: "string",
              example: "student@example.com"
            },
            password: {
              type: "string",
              example: "StrongPassword123"
            },
            role: {
              type: "string",
              enum: ["student", "parent"],
              example: "student"
            }
          }
        },

        LoginUser: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "student@example.com"
            },
            password: {
              type: "string",
              example: "StrongPassword123"
            }
          }
        },

        AuthResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example: "jwt.token.here"
            },
            user: {
              type: "object",
              properties: {
                email: { type: "string" },
                role: { type: "string" },
                isActive: { type: "boolean" }
              }
            }
          }
        }
      }
    }
  },

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);
export default swaggerUi;
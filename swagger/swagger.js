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
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        RegisterUser: {
          type: "object",
          required: ["first_name", "last_name", "email", "password", "confirm_password", "role"],
          properties: {
            first_name: {
                type: "string",
                example: "John"
            },
            last_name: {
                type: "string",
                example: "Doe"
            },
            email: {
              type: "string",
              example: "student@example.com"
            },
            password: {
              type: "string",
              example: "StrongPassword123"
            },
            confirm_password: {
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

        attempts: {
          type: "object",
          required: ["student_id", "quiz_id", "answers", "time_spent"],
          properties: {
            student_id: {
              type: "string",
              example: "65f1a6b9a23b4c001f1c1234"
            },
            quiz_id: {
              type: "string",
              example: "65f1a6b9a23b4c001f1c5678"
            },
            answers: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  questionId: {
                    type: "string",
                    example: "65f1a6b9a23b4c001f1c9999"
                  },
                  selectedOptionId: {
                    type: "string",
                    example: "65f1a6b9a23b4c001f1c8888"
                  }
                }
              }
            },
            time_spent: {
              type: "number",
              example: 120
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
                role: { type: "string" }
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

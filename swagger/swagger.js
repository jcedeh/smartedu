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
          required: ["first_name", "last_name", "email", "password", "confirm_password", "date_of_birth", "role"],
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
            date_of_birth: {
                type: "string",
                format: "date",
                example: "2000-01-01"
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
          required: ["student_id", "quiz_id", "answers", "sibject", "topic", "time_taken"],
          properties: {
            student_id: {
              type: "string",
              example: "65f1a6b9a23b4c001f1c1234"
            },
            quiz_id: {
              type: "string",
              example: "65f1a6b9a23b4c001f1c5678"
            },

            subject: {
              type: "string",
              example: "Mathematics"
            },

            topic: {
              type: "string",
              example: "Number Bases"
            },

            answers: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question_id: {
                    type: "string",
                    example: "65f1a6b9a23b4c001f1c9999"
                  },
                  selected_answer: {
                    type: "string",
                    example: "65f1a6b9a23b4c001f1c8888"
                  }
                }
              }
            },
            time_taken: {
              type: "number",
              example: 120
            }
          }
        },    

        
      }
    }
  },

  

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);
export default swaggerUi;

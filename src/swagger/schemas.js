export const RegisterUserSchema = {
  type: "object",
  required: ["email", "password", "role"],
  properties: {
    email: { type: "string", example: "student@example.com" },
    password: { type: "string", example: "myStrongPassword" },
    role: { type: "string", enum: ["student", "parent"], example: "student" }
  }
};

export const LoginUserSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", example: "student@example.com" },
    password: { type: "string", example: "myStrongPassword" }
  }
};

export const RegisterResponseSchema = {
  type: "object",
  properties: {
    message: { type: "string", example: "User registered successfully" },
    userId: { type: "string", example: "64f123abc..." }
  }
};

export const LoginResponseSchema = {
  type: "object",
  properties: {
    token: { type: "string", example: "jwt-token-here" },
    user: {
      type: "object",
      properties: {
        email: { type: "string", example: "student@example.com" },
        role: { type: "string", example: "student" },
        isActive: { type: "boolean", example: true }
      }
    }
  }
};
import dotenv from "dotenv";

dotenv.config();

export const allowedOrigins = [
  process.env.FRONTEND_URL,
];

export const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
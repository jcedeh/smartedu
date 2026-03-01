import { corsOptions } from "../config/cors_config.js";
import cors from "cors";

export const cors_middleware = cors(corsOptions);
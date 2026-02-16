import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "./lib/auth";
import logger from "./lib/logger";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = 7000;

logger.info("Starting Express server initialization");

app.use(
	cors({
		origin: process.env.FRONTEND_URL, // React app URL
		methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
		credentials: true, // allow cookies
	}),
);
logger.info(`CORS configured with origin: ${process.env.FRONTEND_URL}`);

app.all("/api/auth/*splat", toNodeHandler(auth));
logger.info("Better Auth middleware configured for /api/auth/*");

// Mount express json middleware after Better Auth handler
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
logger.info("JSON middleware configured");

// GET route for testing
app.get("/api/test", (_req, res) => {
	logger.info("Received request at /api/test");
	res.json({ message: "API is working!" });
});

// Error handling middleware (should be last)
app.use(errorHandler);

const server = app.listen(PORT, () => {
	logger.info(`Server running at http://localhost:${PORT}`);
});

server.on("error", (error) => {
	logger.error("Server error:", error);
});

process.on("unhandledRejection", (reason, promise) => {
	logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
	logger.error("Uncaught Exception:", error);
});

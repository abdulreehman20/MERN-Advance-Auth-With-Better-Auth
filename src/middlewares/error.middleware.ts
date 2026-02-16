import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/ApiError";
import logger from "../lib/logger";

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	_next: NextFunction,
) => {
	let error = err;

	if (!(error instanceof ApiError)) {
		const statusCode =
			error.statusCode || (error.name === "ValidationError" ? 400 : 500);
		const message = error.message || "Internal Server Error";
		error = new ApiError(statusCode, message, [], err.stack);
	}

	const response = {
		success: false,
		message: error.message,
		errors: error.errors,
		...(process.env.NODE_ENV === "development" && { stack: error.stack }),
	};

	logger.error(`${req.method} ${req.url} - ${error.message}`, {
		stack: error.stack,
		errors: error.errors,
	});

	return res.status(error.statusCode).json(response);
};

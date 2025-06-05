import { Response } from "express";

/**
 * Send a JSON response with the given data, message, and status code.
 *
 * @param {Response} response - The Express.js response object.
 * @param {any} data - The data to send in the response body.
 * @param {string} message - The message to send in the response body.
 * @param {number} [status=200] - The HTTP status code to use.
 */
export const APIResponse = (
  response: Response,
  data: any,
  message: string,
  status: number = 200,
) => {
  response.status(status).json({
    message,
    data,
  });
};

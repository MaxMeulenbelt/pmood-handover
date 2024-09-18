import Express from 'express'
import { Send, Query } from 'express-serve-static-core'
import Log from './Log'

/**
 * An Express Request strictly typed to only allow specified body parameters.
 */
export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

/**
 * An Express Request strictly typed to only allow specified query parameters.
 */
export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T
}

/**
 * An Express Request strictly typed to only allow specified query and body parameters.
 */
export interface TypedRequest<T extends Query, U> extends Express.Request {
  body: U
  query: T
}

/**
 * An Express Response strictly typed to only allow specified response parameters.
 */
export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>
}

/**
 * Sends a 200 OK response with the given payload and logs the API request.
 *
 * @param req The Express request.
 * @param res The Express response.
 * @param payload The payload to return from the API.
 */
const success = (req: Express.Request, res: Express.Response, payload: object) => {
  Log.log(req, 200)
  res.status(200).send(payload)
}

/**
 * Sends a 400 Bad Request response with the given payload and logs the API request.
 *
 * @param req The Express request.
 * @param res The Express response.
 * @param error A detailed error to log for analysis, optional.
 * @param payload The payload to return from the API, optional.
 */
const badRequest = (req: Express.Request, res: Express.Response, error: unknown = { error: 'Invalid query' }, payload: object = { error: 'Invalid query' }) => {
  Log.log(req, 400, error)
  res.status(400).send(payload)
}

/**
 * Sends a 401 Unauthorised response with the given payload and logs the API request.
 *
 * @param req The Express request.
 * @param res The Express response.
 * @param error A detailed error to log for analysis, optional.
 * @param payload The payload to return from the API, optional.
 */
const unauthorised = (req: Express.Request, res: Express.Response, error: unknown = { error: 'Not authorised' }, payload: object = { error: 'Not authorised' }) => {
  Log.log(req, 401, error)
  res.status(401).send(payload)
}

/**
 * Sends a 403 Forbidden response with the given payload and logs the API request.
 *
 * @param req The Express request.
 * @param res The Express response.
 * @param error A detailed error to log for analysis, optional.
 * @param payload The payload to return from the API, optional.
 */
const forbidden = (req: Express.Request, res: Express.Response, error: unknown = { error: 'Access forbidden' }, payload: object = { error: 'Access Forbidden' }) => {
  Log.log(req, 403, error)
  res.status(403).send(payload)
}

/**
 * Sends a 500 Internal Server Error response with the given payload and logs the API request.
 *
 * @param req The Express request.
 * @param res The Express response.
 * @param error A detailed error to log for analysis, optional.
 * @param payload The payload to return from the API, optional.
 */
const serverError = (req: Express.Request, res: Express.Response, error: unknown = { error: 'Server Error' }, payload: object = { error: 'Server Error' }) => {
  Log.log(req, 500, error)
  res.status(500).send(payload)
}

export default {
  success,
  badRequest,
  unauthorised,
  forbidden,
  serverError,
}

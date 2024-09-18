import Express from 'express'
import fs from 'fs/promises'
import crypto from 'crypto'
import db from '../config/db'
import UserRecord from '../models/UserRecord'

/**
 * Generates an API access token for the given username.
 *
 * @param username The username to generate the access token for.
 * @returns The generated access token.
 * @throws Error if unable to validate the username or generate the access token.
 */
const generateAccessToken = async (username: string) => {
  const isAllowed = await isUsernameAllowed(username)

  if (isAllowed) {
    const accessToken = await getAccessTokenForUser(username)

    if (accessToken) {
      return accessToken
    } else {
      return await createUser(username)
    }
  }

  return null
}

/**
 * Gets the access token for a user.
 *
 * @param username The username to get the access token for.
 * @returns The access token for the user, or null if the user does not exist.
 * @throws Error if unable to read from the database.
 */
const getAccessTokenForUser = async (username: string) => {
  const sql = `
    SELECT access_token
    FROM user
    WHERE username = ?
  `

  const [rows] = await db.execute<UserRecord[]>(sql, [username])

  if (rows && rows.length > 0) {
    return rows[0].access_token
  }

  return null
}

/**
 * Creates a new user and generates an access token for them.
 *
 * @param username The username to create the user for.
 * @returns The generated access token for the user.
 * @throws Error if the user could not be written to the database.
 */
const createUser = async (username: string) => {
  const accessToken = crypto.randomBytes(96).toString('hex')

  const sql = `
    INSERT INTO user(username, access_token)
    VALUES (?, ?)
  `

  await db.execute(sql, [username, accessToken])

  return accessToken
}

/**
 * Checks if a username is allowed for signup.
 *
 * @param username The username to check.
 * @returns If the username is allowed to signup.
 * @throws Error if the username file could not be read.
 */
const isUsernameAllowed = async (username: string) => {
  const path = './src/config/usernames.txt'
  let fd: fs.FileHandle | undefined
  try {
    fd = await fs.open(path, 'r')
    const contents = await fd.readFile({ encoding: 'utf8' })
    const usernames = contents.split('\n')
    await fd.close()
    return usernames.includes(username)
  } catch (e) {
    if (fd) await fd.close()
    throw e
  }
}

/**
 * Validates an API access token and throws an Error if the token is invalid or missing.
 *
 * If no error is thrown, the request is valid and you may safely continue execution.
 * The user id is also returned if the token is valid.
 *
 * @param req The Express request.
 * @returns The user id, if the token is valid.
 * @throws Error if the token is invalid or missing.
 */
const validate = async (req: Express.Request) => {
  const accessToken = req.header('X-Authorization-Token')

  if (accessToken) {
    const sql = `
      SELECT id
      FROM user
      WHERE access_token = ?
    `

    const [rows] = await db.execute<UserRecord[]>(sql, [accessToken])

    if (rows && rows.length > 0) {
      return rows[0].id
    } else {
      throw new Error('Invalid access token')
    }
  } else {
    throw new Error('No access token provided')
  }
}

export default {
  generateAccessToken,
  isUsernameAllowed,
  validate,
}

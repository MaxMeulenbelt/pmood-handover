import Express from 'express'

/**
 * Request middleware that requires HTTP Basic Authentication.
 */
const httpBasicAuth = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  const auth = { login: process.env.EXPORT_WEBPAGE_USERNAME, password: process.env.EXPORT_WEBPAGE_PASSWORD }

  // Parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  // Verify login and password are set and correct
  if (login && password && login === auth.login && password === auth.password) {
    // Grant access
    return next()
  }

  // Deny access
  res.set('WWW-Authenticate', 'Basic realm="/export"')
  res.status(401).send('Not authenticated')
}

export default httpBasicAuth

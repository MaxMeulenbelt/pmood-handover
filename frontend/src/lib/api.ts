import { API_HOST } from '@env'
import authentication from './authentication'

/**
 * Attempts to log the user in for a given username and fetch an API access token.
 *
 * @param username The username to fetch the access token for.
 * @returns The access token for the user.
 * @throws An error if the response status is not 2xx.
 */
const login = async (username: string) => {
  const response = await unauthenticatedApiRequest<{ accessToken: string }>('/v1/login', 'POST', {
    body: { username },
  })
  return response.accessToken
}

/**
 * Performs a HTTP request to the API as an authenticated user i.e. with an access token provided.
 *
 * @param path The path to the API endpoint.
 * @param method The HTTP method to use, defaults to GET.
 * @param options Optional configuration for the HTTP request - headers, query parameters and request body.
 * @returns The response from the API endpoint.
 * @throws An error if the response status is not 2xx.
 */
const authenticatedApiRequest = async <T>(
  path: string,
  method = 'GET',
  options: { headers?: Record<string, string>; queryParams?: Record<string, string>; body?: object } | undefined = undefined
) => {
  const accessToken = await authentication.getAccessToken()

  if (!accessToken) {
    throw new Error('No access token found')
  }

  return await unauthenticatedApiRequest<T>(path, method, {
    headers: {
      'X-Authorization-Token': accessToken,
      ...options?.headers,
    },
    queryParams: options?.queryParams,
    body: options?.body,
  })
}

/**
 * Performs a HTTP request to the API as an unauthenticated user i.e. without an access token provided.
 *
 * @param path The path to the API endpoint.
 * @param method The HTTP method to use, defaults to GET.
 * @param options Optional configuration for the HTTP request - headers, query parameters and request body.
 * @returns The response from the API endpoint.
 * @throws An error if the response status is not 2xx.
 */
const unauthenticatedApiRequest = async <T>(
  path: string,
  method = 'GET',
  options: { headers?: Record<string, string>; queryParams?: Record<string, string>; body?: object } | undefined = undefined
) => {
  let uri = String(API_HOST) + path

  if (options?.queryParams) {
    uri += '?' + new URLSearchParams(options.queryParams).toString()
  }

  const response = await fetch(uri, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  })

  if (response.ok) {
    return (await response.json()) as T
  } else {
    throw new Error(`Failed HTTP request with ${response.status} status code`)
  }
}

/**
 * General function to send an api request for all tasks.
 *
 * @param task The task that the data is for e.g., 'delay-discounting'.
 * @param data The data that needs to be stored for the task.
 */
const taskAPIRequest = async <T>(task: string, data: object) => {
  await authenticatedApiRequest<T>('/v1/' + task, 'POST', { body: data }).catch((e) => void e)
}

export default {
  login,
  taskAPIRequest,
}

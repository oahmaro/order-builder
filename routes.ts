/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /
 * @type {string[]}
 */
export const authRoutes: string[] = ['/login', '/register'];

/**
 * An array for routes thar are only accessible by admins
 * @type {string[]}
 */
export const adminRoutes: string[] = ['/users'];

/**
 * The prefix for api authentication routes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect path after log in
 * @type {string}
 */
export const defaultLoginRedirect: string = '/';

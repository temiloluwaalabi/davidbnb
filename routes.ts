/**
 * An array of routes that are accesible to the public
 * These routes do no require authentication
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/confirm_email",
  "/auth/forgot-password",
];

/**
 * Shared routes (Routes that can be accessed by both guest and logged in users)
 * @type {string[]}
 */
export const sharedRoutes = ["/", "/shared-route", "/about", "/contact-us"];

/**
 *  Guest routes (Routes that can be accessed by guest users who are not logged in)
 * @type {string[]}
 */

export const guestRoutes = [
  "/auth/login",
  "/auth/forgot-password",
  "/auth/confirm_email",
  "/auth/error",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = ["/auth/login", "/auth/error"];
// export const protectedRoutes = [
//   "/auth/"
// ]
/**
 * The prefix for API authentication routes
 * Routes that starts with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/overview";

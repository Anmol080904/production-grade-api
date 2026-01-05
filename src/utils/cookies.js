
export const cookies = {

  getOptions: (overrides = {}) => ({
    httpOnly: true, // JS cannot access cookie (XSS protection)

    secure: process.env.NODE_ENV === 'production', 
    // cookie sent only over HTTPS in production

    sameSite: 'strict', 
    // prevents CSRF by blocking cross-site sending

    maxAge: 16 * 60 * 1000, // 16 minutes (milliseconds)

    path: '/', // cookie valid for entire site

    ...overrides, // allow caller to override defaults
  }),

  /**
   * Set a cookie
   */
  set: (res, name, value, options = {}) => {
    res.cookie(name, value, cookies.getOptions(options));
  },

  /**
   * Clear a cookie
   */
  clear: (res, name, options = {}) => {
    res.clearCookie(name, cookies.getOptions(options));
  },
};

import { createContext } from "react";

/**
 * @fileoverview This file contains the definition of the AppContext.
 * @module AppContext
 */

/**
 * The AppContext provides a context for managing user credentials, user data, and chat user.
 * @typedef {Object} AppContext
 * @property {Object|null} userCredentials - The user credentials.
 * @property {Function} setUserCredentials - A function to set the user credentials.
 * @property {Object|null} userData - The user data.
 * @property {Function} setUserData - A function to set the user data.
 * @property {Object|null} chatUser - The chat user.
 * @property {Function} setChatUser - A function to set the chat user.
 */

const AppContext = createContext({
  userCredentials: null,
  setUserCredentials() {},
  userData: null,
  setUserData() {},
  chatUser: null,
  setChatUser() {},
});

export default AppContext;

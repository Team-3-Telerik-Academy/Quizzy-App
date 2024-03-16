import { createContext } from "react";

const AppContext = createContext({
  userCredentials: null,
  setUserCredentials() {},
  userData: null,
  setUserData() {},
  chatUser: null,
  setChatUser() {},
});

export default AppContext;

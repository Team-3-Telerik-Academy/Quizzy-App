import { createContext } from 'react';

const AppContext = createContext({
  userCredentials: null,
  setUserCredentials() {},
  userData: null,
  setUserData() {},
});

export default AppContext;

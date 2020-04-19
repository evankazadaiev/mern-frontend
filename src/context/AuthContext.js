import { createContext } from 'react';


export const AuthContext = createContext({
  token: null,
  userId: null,
  decodedToken: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  checked: false,
  getMe: () => {},
  getAndUpdate: () => {},
  setIsOnline: () => {},
  setChecked: () => {}
});

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthUserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (authUser) {
      localStorage.setItem('user', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [authUser]);

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUser = () => useContext(AuthUserContext);

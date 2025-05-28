// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
  userRole: 'guest',
  setUserRole: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('guest'); 

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
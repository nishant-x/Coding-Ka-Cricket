// src/context/AuthContext.js
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
  userRole: 'guest',
  setUserRole: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(() => sessionStorage.getItem('userRole') || 'guest');

  const updateUserRole = (role) => {
    sessionStorage.setItem('userRole', role);
    setUserRole(role);
  };

  return (
    <AuthContext.Provider value={{ userRole, setUserRole: updateUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

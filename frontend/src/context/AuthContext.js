import React, { useState } from 'react';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');
  const storedId = localStorage.getItem('id'); 
  const [auth, setAuth] = useState(token ? true : false);
  const [role, setRole] = useState(storedRole || null); 
  const [id, setId] = useState(storedId || null); 

  return (
    <AuthContext.Provider value={{ auth, setAuth, role, setRole, id, setId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

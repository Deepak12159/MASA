import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Try to load user from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('maasa_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Dummy credentials for testing
  const mockUsers = {
    'tech@maasa.com': { password: 'password123', role: 'tech', name: 'Technical Team' },
    'sir@maasa.com': { password: 'password123', role: 'faculty', name: 'Faculty Coordinator' },
    'admin@maasa.com': { password: 'password123', role: 'superuser', name: 'Super Admin' }
  };

  const login = (email, password) => {
    const validUser = mockUsers[email];
    if (validUser && validUser.password === password) {
      const userData = { email, role: validUser.role, name: validUser.name };
      setUser(userData);
      localStorage.setItem('maasa_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('maasa_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

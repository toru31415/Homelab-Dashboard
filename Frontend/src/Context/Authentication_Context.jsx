import {createContext, useContext, useState} from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({children}) {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  async function login(user, password, remember = false) {
    const { data } = await api.post('/auth/login', {username: user, password, remember});
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    setToken(data.token);
    setUsername(data.username);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{username, token, login, logout, isAuthenticated: !!token}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
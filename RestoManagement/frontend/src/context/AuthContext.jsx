import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [token]);

  const login = (userData, userToken) => {
    const normalizedUser = typeof userData === 'string'
      ? {
          username: userData,
          role: userData === 'admin' ? 'ADMIN' : userData === 'staff1' ? 'STAFF' : 'CUSTOMER'
        }
      : userData;

    const finalToken = userToken || 'demo-token';

    localStorage.setItem('token', finalToken);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
    setToken(finalToken);
    setUser(normalizedUser);
    navigate(normalizedUser?.role === 'ADMIN' ? '/dashboard' : '/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

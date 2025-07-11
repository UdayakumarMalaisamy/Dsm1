import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../services/authService';
import { useAuthStore } from '../store/useAuthStore';
import { setToken, setUser, getToken, getUser } from '../utils/tokenUtils';

const Login: React.FC = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setAuthToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    // Redirect if already logged in
    const token = getToken();
    const user = getUser();
    if (token && user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!userID || !password) {
      setError('Please enter both username and password');
      return;
    }

    setError('');
    
    try {
      const response = await login({ username: userID, password });
      const { user, token, needsPasswordChange } = response;
      
      // Store auth data
      setAuthUser(user);
      setAuthToken(token);
      setToken(token);
      setUser(user);
      
      // Navigate based on role and password change requirement
      if (needsPasswordChange) {
        navigate('/change-password');
      } else {
        switch (user.role) {
          case 'admin':
            navigate('/dashboard');
            break;
          case 'teacher':
            navigate('/dashboard');
            break;
          case 'student':
            navigate('/dashboard');
            break;
          case 'parent':
            navigate('/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">DSM Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">User ID</label>
          <input
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter User ID"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter Password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

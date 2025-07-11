import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../services/authService';
import { useAuthStore } from '../store/useAuthStore';
import { getToken } from '../utils/tokenUtils';

const PasswordChange: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const token = getToken();
      if (!token) {
        setError('Authentication token not found');
        return;
      }

      if (!user) {
        setError('User not found');
        return;
      }
      
      await changePassword({ currentPassword, newPassword }, token);
      
      // Navigate to appropriate dashboard after password change
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          You must change your temporary password before continuing.
        </p>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter current password"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter new password"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-1 text-sm font-semibold">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="Confirm new password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;

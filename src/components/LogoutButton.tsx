import { deleteCookie } from '../utils/utils';
import React from 'react';

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    deleteCookie('token');
    deleteCookie('refreshToken');
    deleteCookie('google-token');
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 w-full rounded mt-auto"
    >
      Logout
    </button>
  );
};

export default LogoutButton;

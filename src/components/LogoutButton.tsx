import React from "react";

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/login"; // Redirige vers la page de login
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
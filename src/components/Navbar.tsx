import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const Navbar: React.FC = () => {
  return (
    <nav className="h-screen fixed bg-gray-800 text-white w-64 p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6">
          <Link to="/">My financial app</Link>
        </h1>
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              to="/dashboard"
              className="hover:bg-gray-700 p-2 rounded block"
            >
              Dashbord
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:bg-gray-700 p-2 rounded block">
              Profile
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-auto">
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;

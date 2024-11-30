import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";

const Profile: React.FC = () => {
  const { user } = useUser();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className={`h-screen flex justify-center items-center ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`} // Utilise bg-gray-900 pour le mode sombre
    >
      <div
        className={`w-full max-w-4xl ${
          theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        } p-6 rounded-lg shadow-lg`} // Application de fond et texte selon le thème
      >
        <h1 className="text-3xl font-bold text-center mb-20">Mon Profil</h1>
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <label
                className={`text-lg font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`p-3 border rounded-md w-2/3 ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-gray-200"
                    : "border-gray-300 bg-white text-gray-800"
                }`} // Changements dans les champs de saisie selon le thème
              />
            </div>

            <div className="flex justify-between">
              <label
                className={`text-lg font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Nom
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`p-3 border rounded-md w-2/3 ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-gray-200"
                    : "border-gray-300 bg-white text-gray-800"
                }`}
              />
            </div>

            <div className="flex justify-between">
              <label
                className={`text-lg font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`p-3 border rounded-md w-2/3 ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-gray-200"
                    : "border-gray-300 bg-white text-gray-800"
                }`}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              className={`${
                theme === "dark" ? "bg-yellow-500" : "bg-blue-500"
              } text-white py-2 px-6 rounded-md`}
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
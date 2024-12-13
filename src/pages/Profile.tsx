import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import userApi from '../api/user/user';
import { User } from '../interface/UserInterface';

const Profile: React.FC = () => {
  const { user, setUser } = useUser();
  const { theme } = useTheme();

  const [formData, setFormData] = useState<User>({
    id: user?.id || 0,
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    photo: user?.photo || { id: '', path: '' },
    role: user?.role || { id: '', name: '' },
    status: user?.status || { id: '', name: '' },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo,
        role: user.role,
        status: user.status,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!formData || !formData.id) {
      setError('Les données du formulaire sont invalides.');
      setIsLoading(false);
      return;
    }

    try {
      const updatedUser = await userApi.updateUser(
        formData.id.toString(),
        formData,
      );

      if (user && updatedUser) {
        const updatedUser: User = {
          ...user,
          firstName: formData.firstName || user.firstName,
          lastName: formData.lastName || user.lastName,
        };

        setUser(updatedUser);
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la mise à jour du profil.');
      console.error('Error updating profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`h-screen flex justify-center items-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div
        className={`w-full max-w-4xl ${
          theme === 'dark'
            ? 'bg-gray-800 text-gray-100'
            : 'bg-white text-gray-800'
        } p-6 rounded-lg shadow-lg`}
      >
        <h1 className="text-3xl font-bold text-center mb-20">Mon Profil</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <label
                className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
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
                  theme === 'dark'
                    ? 'border-gray-600 bg-gray-700 text-gray-200'
                    : 'border-gray-300 bg-white text-gray-800'
                }`}
              />
            </div>

            <div className="flex justify-between">
              <label
                className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
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
                  theme === 'dark'
                    ? 'border-gray-600 bg-gray-700 text-gray-200'
                    : 'border-gray-300 bg-white text-gray-800'
                }`}
              />
            </div>

            <div className="flex justify-between">
              <label
                className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                disabled
                value={formData.email}
                className={`p-3 border rounded-md w-2/3
                  ${
                    theme === 'dark'
                      ? 'border-gray-600 bg-gray-700 text-gray-400'
                      : 'border-gray-300 bg-gray-100 text-gray-500'
                  }
                  cursor-not-allowed opacity-60
                `}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                theme === 'dark' ? 'bg-yellow-500' : 'bg-blue-500'
              } text-white py-2 px-6 rounded-md ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

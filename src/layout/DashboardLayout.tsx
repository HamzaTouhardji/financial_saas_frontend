import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import { getCookie, setCookie } from '../utils/utils';
import { authenticateWithGoogle } from '../api/auth/googleAuth';
import { User } from '../interface/UserInterface';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUser = async () => {
      if (user) return;

      try {
        const google_token = getCookie('google-token');

        if (google_token) {
          const result = await authenticateWithGoogle(google_token);

          if (result && result.user) {
            const { id, email, firstName, lastName, photo, role, status } =
              result.user;
            const data: User = {
              id,
              email,
              firstName,
              lastName,
              photo: {
                id: photo.id,
                path: photo.path,
              },
              role: {
                id: role.id,
                name: role.name,
              },
              status: {
                id: status.id,
                name: status.name,
              },
            };

            setCookie('refreshToken', result.refreshToken);
            setCookie('token', result.token);
            setCookie('tokenExpires', result.tokenExpires);

            setUser(data);
          } else {
            console.error(
              "Erreur d'authentification :",
              result?.message || 'Erreur inconnue',
            );
            navigate('/login');
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'initialisation de l'utilisateur :",
          error,
        );
        navigate('/login');
      }
    };

    initializeUser();
  }, [user, setUser, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="flex bg-gray-100">
        <Navbar />
        <div className="flex-grow pl-64">{children}</div>
      </div>
      <footer className="bg-gray-800 text-white text-center py-4">
        &copy; {new Date().getFullYear()} Fiance SAAS
      </footer>
    </div>
  );
};

export default DashboardLayout;

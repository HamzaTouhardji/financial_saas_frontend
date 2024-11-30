import { Link } from 'react-router-dom';

const Home = () => {
  const isAuthenticated = !!document.cookie.match('token');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-20">Bienvenue sur Fiancial SAAS</h1>
      
      {isAuthenticated ? (
        <div className="text-center">
          <Link to="/dashboard" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Aller au tableau de bord
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Non connecté</h2>
          <p className="text-gray-700 mb-4">Pour accéder au contenu privé, veuillez vous connecter.</p>
          <Link to="/login" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Se connecter
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
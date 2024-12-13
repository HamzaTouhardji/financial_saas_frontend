import GoogleLoginButton from '../components/GoogleLoginButton';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Se connecter
        </h1>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default Login;

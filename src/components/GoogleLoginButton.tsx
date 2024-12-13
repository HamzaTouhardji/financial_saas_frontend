import { deleteCookie, setCookie } from '../utils/utils';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const handleSuccess = async (response: any) => {
    try {
      const google_token = response.credential;

      if (google_token) {
        setCookie('google-token', google_token);
        window.location.href = '/dashboard';
      } else {
        throw new Error('Aucun token reçu de Google');
      }
    } catch (error) {
      deleteCookie('google-token');
      alert('Erreur : impossible de gérer le token Google.');
    }
  };

  const handleError = () => {
    console.error('Erreur de connexion Google');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

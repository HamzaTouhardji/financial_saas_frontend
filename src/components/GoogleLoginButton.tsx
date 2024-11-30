import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {

  const handleSuccess = async (response: any) => {
    const google_token = response.credential;
  
    if (google_token) {
      const expires = new Date();
      expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // Expiration dans 7 jours
  
      document.cookie = `token=${google_token}; path=/; secure; SameSite=Strict; expires=${expires.toUTCString()}`;
      window.location.href = "/dashboard";
    } else {
      console.error("Aucun token reçu de Google");
    }
  };

  const handleError = () => {
    console.error("Erreur de connexion Google");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
export const authenticateWithGoogle = async (idToken: string) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/google/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
    
    if (!res.ok) {
      throw new Error(`Erreur HTTP: ${res.status}`);
    }

    const data = await res.json();

    return data
    
  } catch (error:any) {
    console.error('Erreur lors de l\'authentification Google:', error);
    return { success: false, message: error.message };
  }
};
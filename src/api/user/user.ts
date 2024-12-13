import axios from 'axios';
import { User } from '../../interface/UserInterface';
import { getCookie } from '../../utils/utils';
import { toast } from 'react-toastify';

const API_BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

export const userApi = {
  createUser: async (userData: User): Promise<User> => {
    const response = await axios.post<User>(`${API_BASE_URL}/users`, userData);
    return response.data;
  },

  getUser: async (id: string): Promise<User> => {
    const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, userData: User): Promise<User> => {
    const token = getCookie('token');

    const { email, ...updatedUserData } = userData;

    if (!token) {
      throw new Error('Token non disponible ou non valide.');
    }

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/users/${id}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success('Utilisateur mis à jour avec succès!');

      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Erreur du serveur:', error.response.data);
        throw new Error(`Erreur du serveur: ${error.response.status}`);
      } else if (error.request) {
        console.error('Pas de réponse du serveur:', error.request);
        throw new Error('Aucune réponse du serveur');
      } else {
        console.error('Erreur lors de la requête:', error.message);
        throw new Error(`Erreur: ${error.message}`);
      }
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
  },
};

export default userApi;

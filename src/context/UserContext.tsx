import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { authenticateWithGoogle } from "../api/auth/googleAuth";
import { getCookie } from "../utils/utils";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  role: string;
  status: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          return;
        }

        const token = getCookie("google-token");
        if (token) {
          const result = await authenticateWithGoogle(token);

          if (result) {
            const user = result.user
            const data: User = {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              photo: user.photo.path,
              role: user.role.id,
              status: user.status.id,
            };

            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
          } else {
            console.error(
              "Erreur d'authentification :",
              result?.message || "Erreur inconnue"
            );
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'initialisation de l'utilisateur :",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

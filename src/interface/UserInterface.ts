export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  photo: {
    id: string;
    path: string;
  };
  role: {
    id: string;
    name: string;
  };
  status: {
    id: string;
    name: string;
  };
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

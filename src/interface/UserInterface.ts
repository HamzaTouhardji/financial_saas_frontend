export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  role: number;
  status: number;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
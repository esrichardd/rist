import { User } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
};

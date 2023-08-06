import { useContext } from "react";
import { AuthContext } from "./auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

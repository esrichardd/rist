import React from "react";
import { AuthContextType } from "./types";

export const AuthContext: React.Context<AuthContextType | null> =
  React.createContext<AuthContextType | null>(null);

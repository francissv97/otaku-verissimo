import { createContext, ReactNode, useState } from "react";
import { IViewer } from "@/types/IViewer";

interface IAuthContext {
  user: IViewer | null;
  signin: (user: IViewer) => void;
}

export const AuthContext = createContext({} as IAuthContext);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<IViewer | null>(null);

  function signin(user: IViewer) {
    setUser(user);
  }

  return <AuthContext.Provider value={{ user, signin }}>{children}</AuthContext.Provider>;
}

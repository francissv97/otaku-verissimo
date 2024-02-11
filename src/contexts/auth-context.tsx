import { createContext, ReactNode, useState } from "react";
import { TViewer } from "@/types/t-viewer";

type TAuthContext = {
  user: TViewer | null | undefined;
  signin: (user: TViewer | null) => void;
};

export const AuthContext = createContext({} as TAuthContext);

type TAuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: TAuthContextProviderProps) {
  const [user, setUser] = useState<TViewer | null | undefined>(undefined);

  function signin(user: TViewer | null) {
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ user, signin }}>
      {children}
    </AuthContext.Provider>
  );
}

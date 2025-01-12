import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  changeUsername: (oldUsername: string, newUsername: string) => void;
  currentUsername: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("leone");
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const lastLogin = localStorage.getItem("last_login");
    const savedUsername = getFromLocalStorage("current_username", "leone");
    
    setCurrentUsername(savedUsername);
    
    if (token && lastLogin) {
      const lastLoginTime = new Date(lastLogin).getTime();
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - lastLoginTime;
      const hoursElapsed = timeElapsed / (1000 * 60 * 60);
      
      if (hoursElapsed < 24) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("last_login");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    // Always allow leone/2601
    if (username === "leone" && password === "2601") {
      localStorage.setItem("auth_token", "admin_token");
      localStorage.setItem("last_login", new Date().toISOString());
      setIsAuthenticated(true);
      setCurrentUsername(username);
      saveToLocalStorage("current_username", username);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
      return true;
    }
    
    // Check additional users
    const additionalUsers = getFromLocalStorage('additional_users', []);
    const user = additionalUsers.find((u: any) => u.username === username && u.password === password);
    
    if (user) {
      localStorage.setItem("auth_token", "admin_token");
      localStorage.setItem("last_login", new Date().toISOString());
      setIsAuthenticated(true);
      setCurrentUsername(username);
      saveToLocalStorage("current_username", username);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
      return true;
    }
    
    toast({
      variant: "destructive",
      title: "Erro no login",
      description: "Usuário ou senha incorretos.",
    });
    return false;
  };

  const changeUsername = (oldUsername: string, newUsername: string) => {
    if (oldUsername === "leone") {
      toast({
        variant: "destructive",
        title: "Erro na alteração",
        description: "Não é possível alterar o usuário padrão 'leone'.",
      });
      return;
    }

    const additionalUsers = getFromLocalStorage('additional_users', []);
    const updatedUsers = additionalUsers.map((user: any) => 
      user.username === oldUsername ? { ...user, username: newUsername } : user
    );
    
    saveToLocalStorage('additional_users', updatedUsers);
    
    if (currentUsername === oldUsername) {
      setCurrentUsername(newUsername);
      saveToLocalStorage("current_username", newUsername);
    }
    
    toast({
      title: "Usuário alterado com sucesso!",
      description: `Nome de usuário alterado de ${oldUsername} para ${newUsername}.`,
    });
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("last_login");
    setIsAuthenticated(false);
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changeUsername, currentUsername }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
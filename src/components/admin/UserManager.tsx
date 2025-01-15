import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { User, UserPlus, UserMinus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { SupabaseConnectionManager } from "./SupabaseConnectionManager";

interface UserData {
  username: string;
  password: string;
}

export function UserManager() {
  const { currentUsername } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserData[]>(() => {
    return getFromLocalStorage('additional_users', []);
  });
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleAddUser = () => {
    if (newUsername === "leone") {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não é possível adicionar um usuário com nome 'leone'",
      });
      return;
    }

    if (!newUsername || !newPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Preencha todos os campos",
      });
      return;
    }

    const userExists = users.some(user => user.username === newUsername);
    if (userExists) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Este usuário já existe",
      });
      return;
    }

    const newUser = { username: newUsername, password: newPassword };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveToLocalStorage('additional_users', updatedUsers);
    
    setNewUsername("");
    setNewPassword("");
    
    toast({
      title: "Sucesso",
      description: "Usuário adicionado com sucesso",
    });
  };

  const handleRemoveUser = (username: string) => {
    if (username === "leone") {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não é possível remover o usuário padrão",
      });
      return;
    }

    const updatedUsers = users.filter(user => user.username !== username);
    setUsers(updatedUsers);
    saveToLocalStorage('additional_users', updatedUsers);
    
    toast({
      title: "Sucesso",
      description: "Usuário removido com sucesso",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Gerenciar Usuários</h2>
        <p className="text-muted-foreground mb-6">Usuário atual: {currentUsername}</p>

        <div className="space-y-6">
          {/* Adicionar novo usuário */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Adicionar Novo Usuário
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="newUsername" className="block text-sm font-medium mb-1">
                  Usuário
                </label>
                <Input
                  id="newUsername"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Digite o nome do usuário"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                  Senha
                </label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite a senha"
                />
              </div>
              <Button onClick={handleAddUser}>
                Adicionar Usuário
              </Button>
            </div>
          </div>

          {/* Lista de usuários */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Usuários Cadastrados
            </h3>
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.username} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                  <span>{user.username}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveUser(user.username)}
                  >
                    <UserMinus className="w-4 h-4 mr-1" />
                    Remover
                  </Button>
                </div>
              ))}
              {users.length === 0 && (
                <p className="text-muted-foreground text-sm">Nenhum usuário adicional cadastrado</p>
              )}
            </div>
          </div>
        </div>
        </CardContent>
      </Card>

      <SupabaseConnectionManager />
    </div>
  );
}

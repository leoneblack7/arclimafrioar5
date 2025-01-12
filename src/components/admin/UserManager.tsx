import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function UserManager() {
  const { currentUsername, changeUsername } = useAuth();
  const [oldUsername, setOldUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const handleUsernameChange = (e: React.FormEvent) => {
    e.preventDefault();
    changeUsername(oldUsername, newUsername);
    setOldUsername("");
    setNewUsername("");
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Gerenciar Usuário</h2>
        <p className="text-muted-foreground mb-4">Usuário atual: {currentUsername}</p>
        <form onSubmit={handleUsernameChange} className="space-y-4">
          <div>
            <label htmlFor="oldUsername" className="block text-sm font-medium mb-1">
              Usuário Antigo
            </label>
            <Input
              id="oldUsername"
              value={oldUsername}
              onChange={(e) => setOldUsername(e.target.value)}
              placeholder="Digite o usuário atual"
              required
            />
          </div>
          <div>
            <label htmlFor="newUsername" className="block text-sm font-medium mb-1">
              Novo Usuário
            </label>
            <Input
              id="newUsername"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Digite o novo usuário"
              required
            />
          </div>
          <Button type="submit">
            Alterar Usuário
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
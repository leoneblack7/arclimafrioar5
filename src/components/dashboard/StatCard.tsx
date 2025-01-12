import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, RotateCcw } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  id: string;
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
  isEditing: boolean;
  editValue: string;
  onEdit: (id: string) => void;
  onSave: (id: string) => void;
  onReset: (id: string) => void;
  onEditValueChange: (value: string) => void;
}

export const StatCard = ({
  id,
  title,
  value,
  icon: Icon,
  description,
  isEditing,
  editValue,
  onEdit,
  onSave,
  onReset,
  onEditValueChange,
}: StatCardProps) => {
  return (
    <Card className="border border-primary/20 bg-secondary/5 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-primary animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {isEditing ? (
            <div className="flex gap-2">
              <Input
                type="text"
                value={editValue}
                onChange={(e) => onEditValueChange(e.target.value)}
                className="w-24 bg-black/50 border-primary/30"
              />
              <Button
                size="sm"
                onClick={() => onSave(id)}
                className="bg-primary/20 hover:bg-primary/40"
              >
                Salvar
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold font-mono text-primary">{value}</div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onEdit(id)}
                  className="hover:bg-primary/20"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onReset(id)}
                  className="hover:bg-primary/20"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
import { StatCard } from "./StatCard";
import { useState } from "react";

interface StatsGridProps {
  stats: Array<{
    id: string;
    title: string;
    value: string;
    icon: any;
    description: string;
  }>;
  onEdit: (id: string) => string;
  onSave: (id: string, value: string) => void;
  onReset: (id: string) => void;
}

export const StatsGrid = ({ stats, onEdit, onSave, onReset }: StatsGridProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleStartEdit = (id: string) => {
    setEditValue(onEdit(id));
    setEditingId(id);
  };

  const handleSave = (id: string) => {
    onSave(id, editValue);
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          {...stat}
          isEditing={editingId === stat.id}
          editValue={editValue}
          onEdit={handleStartEdit}
          onSave={handleSave}
          onReset={onReset}
          onEditValueChange={setEditValue}
        />
      ))}
    </div>
  );
};
import React from "react";
import { Theme } from "@/types/theme";
import { ThemePreview } from "./ThemePreview";

interface ThemeCardProps {
  theme: Theme;
  isActive: boolean;
  onSelect: (theme: Theme) => void;
}

export const ThemeCard = ({ theme, isActive, onSelect }: ThemeCardProps) => {
  return (
    <div
      className={`p-4 rounded-lg border transition-all cursor-pointer hover:scale-105 ${
        isActive ? "ring-2 ring-primary" : "hover:border-primary"
      }`}
      style={{
        background: theme.gradient || theme.colors.background,
        border: `1px solid ${theme.colors.primary}`
      }}
      onClick={() => onSelect(theme)}
    >
      <h3 
        className="font-semibold mb-2" 
        style={{ color: theme.colors.text }}
      >
        {theme.name}
      </h3>
      
      <ThemePreview theme={theme} />
      
      <div className="flex gap-2">
        {Object.entries(theme.colors).map(([key, color]) => (
          <div
            key={key}
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: color }}
            title={key}
          />
        ))}
      </div>
    </div>
  );
};
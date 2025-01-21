import React from "react";
import { Theme } from "@/types/theme";

interface ThemePreviewProps {
  theme: Theme;
}

export const ThemePreview = ({ theme }: ThemePreviewProps) => {
  return (
    <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 bg-white shadow-lg">
      {/* Header */}
      <div 
        className="absolute top-0 w-full h-12" 
        style={{ background: theme.colors.primary }}
      >
        <div className="flex items-center h-full px-4">
          <div 
            className="w-24 h-6 rounded" 
            style={{ background: theme.colors.accent }}
          ></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="absolute top-16 left-4 right-4">
        <div 
          className="w-full h-8 rounded mb-2" 
          style={{ background: theme.colors.secondary }}
        ></div>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1/3 h-16 rounded"
              style={{ background: theme.colors.accent }}
            ></div>
          ))}
        </div>
        <div 
          className="w-3/4 h-4 rounded mb-2" 
          style={{ background: theme.colors.text }}
        ></div>
        <div 
          className="w-1/2 h-4 rounded" 
          style={{ background: theme.colors.text }}
        ></div>
      </div>
    </div>
  );
};
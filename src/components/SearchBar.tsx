import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearch?: (term: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps = {}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex items-center max-w-md w-full">
      <div className="relative flex-1">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar produtos..."
          className="w-full pl-4 pr-10 py-2 border-2 border-gray-200 rounded-l-lg focus:border-primary focus:ring-0"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
      <Button 
        onClick={handleSearch} 
        className="rounded-l-none bg-primary hover:bg-primary/90"
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
};
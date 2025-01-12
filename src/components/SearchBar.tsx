import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder="Buscar produtos..."
        className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:border-primary"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  );
};
import { Menu } from "lucide-react";
import { Button } from "@heroui/button";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center px-6 h-16 bg-white border-b border-zinc-200">
      <Button
        onPress={onMenuClick}
        variant="ghost"
        size="sm"
        className="p-0 mr-4 text-white border-none bg-blue-primary md:hidden"
      >
        <Menu size={24} />
      </Button>
      <h2 className="text-lg font-medium">Dashboard</h2>
    </header>
  );
}

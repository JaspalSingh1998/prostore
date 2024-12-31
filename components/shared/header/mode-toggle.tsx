"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
const ModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:ring-0 focus-visible:ring-offset-0">
        <Button variant="ghost">
          {theme === "system" ? (
            <SunMoonIcon />
          ) : theme === "dark" ? (
            <MoonIcon />
          ) : (
            <SunIcon />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Apperance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={theme === "system"} onClick={() => setTheme("system")}>System</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === "dark"} onClick={() => setTheme("dark")}>Dark</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === "light"} onClick={() => setTheme("light")}>Light</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;

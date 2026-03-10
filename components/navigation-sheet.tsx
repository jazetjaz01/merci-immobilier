import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button size="icon" variant="outline" aria-label="Ouvrir le menu">
          <Menu />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="px-6 py-6 flex flex-col items-center">
        <div className="w-full flex justify-start">
          <Logo />
        </div>
        
        {/* Correction : On retire max-w-max pour permettre au menu de prendre 
          toute la largeur du Sheet et on centre les items.
        */}
        <div className="w-full mt-10">
          <NavMenu 
            className="w-full max-w-full flex-col items-center" 
            orientation="vertical" 
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
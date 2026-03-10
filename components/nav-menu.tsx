"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const NavMenu = ({ className, ...props }: ComponentProps<typeof NavigationMenu>) => (
  <NavigationMenu 
    {...props} 
    className={cn("!flex-col w-full max-w-full", className)}
  >
    <NavigationMenuList className="w-full">
      {/* On répète ce pattern pour chaque item */}
      <NavigationMenuItem className="w-full">
        <NavigationMenuLink 
          asChild 
          className={cn(navigationMenuTriggerStyle(), "w-full !justify-center md:w-max")}
        >
          <Link href="/annonces">Acheter</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      
      <NavigationMenuItem className="w-full">
        <NavigationMenuLink 
          asChild 
          className={cn(navigationMenuTriggerStyle(), "w-full !justify-center md:w-max")}
        >
          <Link href="/annonces">Louer</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem className="w-full">
        <NavigationMenuLink 
          asChild 
          className={cn(navigationMenuTriggerStyle(), "w-full !justify-center md:w-max")}
        >
          <Link href="/vendre">Vendre</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem className="w-full">
        <NavigationMenuLink 
          asChild 
          className={cn(navigationMenuTriggerStyle(), "w-full !justify-center md:w-max")}
        >
          <Link href="https://join.merci-immobilier.com">Devenir conseiller</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem className="w-full">
        <NavigationMenuLink 
          asChild 
          className={cn(navigationMenuTriggerStyle(), "w-full !justify-center md:w-max")}
        >
          <Link href="/contact">Contact</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
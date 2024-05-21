import { ModeToggle } from "./mode-toggle";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Nav() {
  return (
    <div className="flex h-20 w-full items-center justify-between border-b-2 border-black p-4 dark:border-white md:h-32 md:p-10">
      <div className="flex items-center gap-2 text-xl md:gap-7 md:text-4xl">
        <div className="h-14 w-14 rounded-full border-2 border-black dark:border-white md:h-20 md:w-20"></div>
        <div>INTROSPECT</div>
      </div>
      <div className="flex items-center gap-2 md:gap-7">
        <div className="h-8 w-8 md:h-12 md:w-12">
          <ModeToggle />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="h-8 w-8 md:h-12 md:w-12" />
          </SheetTrigger>
          <SheetContent className="opacity-80 dark:bg-slate-200"></SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

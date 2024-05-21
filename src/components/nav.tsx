import { ModeToggle } from "./mode-toggle";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Nav() {
  return (
    <>
      <div className="flex h-16 w-full items-center justify-between border-b-2 border-black px-2 py-8 dark:border-white md:p-10">
        <div className="flex items-center gap-2 text-lg md:gap-7 md:text-xl ">
          <div className="h-10 w-10 rounded-full border-2 border-black dark:border-white md:h-14 md:w-14"></div>
          <div>INTROSPECT</div>
        </div>
        <div className="flex items-center gap-2 md:gap-7">
          <div className="h-8 w-8">
            <ModeToggle />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="h-8 w-8 " />
            </SheetTrigger>
            <SheetContent className="opacity-80 dark:bg-slate-200"></SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="hidden h-10 w-1/2 items-center justify-between border-b-2 border-r border-black pl-6 pr-8 text-xs  tracking-wider underline dark:border-white md:flex lg:px-12 lg:text-sm">
        <p className="hover:cursor-pointer">Writer's Studio</p>
        <p className="hover:cursor-pointer">Zen Garden</p>
        <p className="hover:cursor-pointer">Reading room</p>
      </div>
    </>
  );
}

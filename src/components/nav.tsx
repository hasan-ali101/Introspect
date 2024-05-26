import { ModeToggle } from "./mode-toggle";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Nav() {
  return (
    <>
      <div className="flex h-16 w-full items-center justify-between border-b-2 border-black px-2 py-8 drop-shadow-2xl dark:border-white md:p-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg md:gap-7 md:text-xl "
        >
          <div className="h-10 w-10 rounded-full border-2 border-black dark:border-white md:h-14 md:w-14"></div>
          <div>INTROSPECT</div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
          <div className="h-8 w-8">
            <ModeToggle />
          </div>
          <div className="hidden items-center md:flex">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="h-8 w-8 md:hidden" />
            </SheetTrigger>
            <SheetContent className=" dark:bg-gray-900">
              <div className="flex h-full flex-col justify-around">
                <div className="flex flex-col gap-8">
                  <SheetClose asChild>
                    <Link
                      href="/write"
                      className="rounded-lg bg-slate-100 px-6 py-6 transition-transform hover:scale-105 hover:cursor-pointer hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                    >
                      <p>Write</p>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/meditate"
                      className="rounded-lg bg-slate-100 px-6 py-6 transition-transform hover:scale-105 hover:cursor-pointer hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                    >
                      <p>Meditate</p>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/read"
                      className="rounded-lg bg-slate-100 px-6 py-6 transition-transform hover:scale-105 hover:cursor-pointer hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                    >
                      <p>Read</p>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/read"
                      className="rounded-lg bg-slate-100 px-6 py-6 transition-transform hover:scale-105 hover:cursor-pointer hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                    >
                      <p>Discuss</p>
                    </Link>
                  </SheetClose>
                </div>
                <SignedOut>
                  <div className="flex items-center justify-start gap-4 px-6 py-8 font-semibold underline">
                    <SignInButton />
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center justify-start gap-4 px-6 py-8 font-semibold underline">
                    <UserButton />
                    <SignOutButton />
                  </div>
                </SignedIn>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="hidden h-10 w-1/2 items-center justify-between border-b-2 border-r border-black pl-6 pr-8 text-sm font-light tracking-wider underline drop-shadow-2xl dark:border-white md:flex lg:px-12 lg:text-sm">
        <Link href="/write" className="hover:cursor-pointer">
          Write
        </Link>
        <Link href="/meditate" className="hover:cursor-pointer">
          Meditate
        </Link>
        <Link href="/read" className="hover:cursor-pointer">
          Read
        </Link>
        <Link href="/read" className="hover:cursor-pointer">
          Discuss
        </Link>
      </div>
    </>
  );
}

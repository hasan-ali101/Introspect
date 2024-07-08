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
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Nav() {
  return (
    <div
      className={`bg-[#a7bdea] text-white  dark:bg-dark-primary ${montserrat.className}`}
    >
      <div className="flex h-16 w-full items-center justify-between border-b-2 border-white  bg-gradient-to-t px-2 py-12 shadow-xl dark:border-white dark:from-[#464775] dark:to-dark-primary md:p-10">
        <Link
          href="/write"
          className="flex items-center gap-2 text-lg md:gap-2 md:text-xl "
        >
          <div className="h-14 w-14 rounded-full border-2 pt-1">
            <Image
              src="/logo-white.png"
              alt="Introspect Logo"
              width={60}
              height={60}
              className="h-14 w-14"
            />
          </div>
          <div className="tracking-widest">INTROSPECT</div>
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
            <SheetContent className="bg-gradient-to-t dark:from-dark-secondary dark:to-dark-primary">
              <div className="flex h-full flex-col justify-around">
                <div className="flex flex-col gap-4 text-xl">
                  <SheetClose asChild>
                    <Link
                      href="/write"
                      className="rounded-lg border bg-slate-100 px-6 py-6 transition-transform hover:cursor-pointer hover:bg-slate-200 dark:border-white dark:bg-dark-secondary dark:hover:bg-dark-secondary/90"
                    >
                      <p>Write</p>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/meditate"
                      className="rounded-lg border bg-slate-100 px-6 py-6 transition-transform hover:cursor-pointer hover:bg-slate-200 dark:border-white dark:bg-dark-secondary dark:hover:bg-dark-secondary/90"
                    >
                      <p>Meditate</p>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/read"
                      className="rounded-lg border bg-slate-100 px-6 py-6 transition-transform hover:cursor-pointer hover:bg-slate-200 dark:border-white dark:bg-dark-secondary dark:hover:bg-dark-secondary/90"
                    >
                      <p>Read</p>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/read"
                      className="rounded-lg border bg-slate-100 px-6 py-6 transition-transform hover:cursor-pointer hover:bg-slate-200 dark:border-white dark:bg-dark-secondary dark:hover:bg-dark-secondary/90"
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
                  <SignOutButton>
                    <div className="flex cursor-pointer items-center justify-start gap-4 rounded-md border p-6 font-semibold  dark:border-white dark:bg-dark-tertiary hover:dark:bg-transparent">
                      <UserButton />
                      Sign Out
                    </div>
                  </SignOutButton>
                </SignedIn>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="relative h-10 w-full ">
        <div className="absolute hidden h-10 w-1/2 items-center justify-between rounded-br-lg border-b-2 border-r border-white bg-gradient-to-t pl-6 pr-8 text-sm font-light tracking-wider  shadow-2xl dark:border-white dark:from-[#464775] dark:to-dark-primary md:flex lg:px-12">
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
      </div>
    </div>
  );
}

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { IBook } from "@/types/book";

interface BookProps extends IBook {
  editMode: boolean;
}

const Book = ({
  title,
  color,
  label,
  notebook,
  editMode,
  id,
  coverImage,
}: BookProps) => {
  return (
    <div>
      <div
        className={cn(
          !editMode && "hover:scale-105",
          "relative w-20 cursor-pointer transition-all sm:w-28",
        )}
      >
        <Image
          className="h-full w-full"
          src="/book3.png"
          alt="book"
          width={275}
          height={370}
        />
        <div
          className={cn(
            color,
            "absolute bottom-[0.2px] left-[0px] right-[4.5px] top-[4.5px] flex justify-center rounded-l-sm rounded-r-sm border border-gray-500 shadow-md sm:left-[1px] sm:right-[7px] sm:top-[6.4px]",
          )}
        >
          <div className="relative h-full w-full">
            {coverImage && (
              <img
                src={coverImage}
                alt="cover"
                className="absolute inset-0 h-full w-auto object-cover"
              />
            )}
            {label && (
              <div className="px-2 pt-2">
                <div
                  className={cn(
                    notebook && "ml-[5px] sm:ml-1",
                    "flex  min-h-6 w-full items-center justify-center rounded-md bg-white text-center opacity-95",
                  )}
                >
                  <p className="line-clamp-3 max-h-12 text-[7px] font-semibold text-black sm:line-clamp-4 sm:max-h-16 sm:text-[10px]">
                    {title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {notebook && (
          <div className="absolute -left-[2px] top-0 flex h-full w-2 flex-col justify-around py-2 sm:-left-[1] sm:w-3">
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100"></div>
            <div className="hidden h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100 sm:flex"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;

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
          // !editMode && "hover:scale-105",
          "relative  w-28 transition-all",
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
            "absolute bottom-[0.2px] left-[1px] right-[7px] top-[6.4px] flex justify-center rounded-l-sm rounded-r-sm border border-gray-500 shadow-md",
          )}
        >
          <div className="relative h-full w-full">
            {coverImage && (
              <img
                src={coverImage}
                alt="cover"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            {label && (
              <div className="px-2 pt-2">
                <div
                  className={cn(
                    notebook && "ml-1",
                    "flex  min-h-6 w-full items-center justify-center rounded-md bg-white text-center opacity-95",
                  )}
                >
                  <p className="line-clamp-4 max-h-16 text-[10px] font-semibold text-black">
                    {title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {notebook && (
          <div className="absolute -left-[1.5px] top-0 flex h-full w-3 flex-col justify-around py-2">
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100"></div>
            <div className="flex  h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 dark:border-gray-100"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;

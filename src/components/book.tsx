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
  console.log(coverImage);

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
        ></Image>
        <div
          className={cn(
            color,
            "absolute bottom-[0.3px] left-[0px] right-[4.5px] top-[4.5px] flex justify-center rounded-l-sm rounded-r-sm border border-gray-500 p-1 shadow-md sm:left-[1px] sm:right-[7px] sm:top-[6.5px] sm:p-2",
          )}
        >
          {coverImage && (
            <img
              src={coverImage}
              alt="cover"
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover"
            />
          )}

          <div
            className={cn(
              notebook && "ml-[5px] sm:ml-1",
              label ? "bg-white" : "bg-transparent",
              "flex h-fit min-h-6 w-full items-center justify-center rounded-md px-[1px] py-1 text-center  opacity-95",
            )}
          >
            <p className="line-clamp-3 max-h-12 text-[7px] font-semibold text-black sm:line-clamp-4 sm:max-h-16 sm:text-[10px]">
              {title}
            </p>
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

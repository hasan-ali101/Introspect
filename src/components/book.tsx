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
  text,
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
          "relative w-20 cursor-pointer transition-all lg:w-28",
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
            "absolute bottom-[0.3px] left-[0px] right-[4.5px] top-[4.5px] flex justify-center rounded-l-sm rounded-r-sm border border-gray-500 p-1 shadow-md lg:left-[1px] lg:right-[7px] lg:top-[6.5px] lg:p-2",
          )}
        >
          {coverImage && (
            <img
              src={coverImage}
              alt="cover"
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
          )}

          <div
            className={cn(
              notebook && "ml-[5px] lg:ml-1",
              label ? "bg-white" : "bg-transparent",
              "flex h-fit min-h-6 w-full items-center justify-center rounded-md px-[1px] py-1 text-center  opacity-95",
            )}
          >
            <p
              className={cn(
                text,
                "line-clamp-3 max-h-12 text-[7px] lg:line-clamp-4 lg:max-h-16 lg:text-[10px] ",
              )}
            >
              {title}
            </p>
          </div>
        </div>
        {notebook && (
          <div className="absolute -left-[2px] top-0 flex h-full w-2 flex-col justify-around py-2 lg:-left-[1] lg:w-3">
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500"></div>
            <div className="h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500"></div>
            <div className="hidden h-[5px] rounded-l-xl border-b-2 border-l-2 border-b-slate-500 border-l-slate-500 lg:flex"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;

import Image from "next/image";
import { cn } from "@/lib/utils";

interface IBook {
  title: string;
  color: string;
  label: boolean;
  text: string;
  notebook: boolean;
}

const Book = ({ title, color, label, text, notebook }: IBook) => {
  return (
    <div>
      <div className="relative w-20 cursor-pointer transition-all hover:scale-105 lg:w-28">
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
            "absolute bottom-[0px] left-[0px] right-[5px] top-[4px] flex justify-center rounded-l-sm border-r border-t border-slate-400 p-1 shadow-md lg:right-[7px] lg:top-[6px] lg:p-2",
          )}
        >
          <div
            className={cn(
              notebook && "ml-[5px] lg:ml-1",
              label ? "bg-white" : "bg-transparent",
              "flex h-fit min-h-6 w-full items-center justify-center rounded-md px-[1px] py-1 text-center opacity-95",
            )}
          >
            <p
              className={cn(
                text,
                "line-clamp-3 max-h-12 text-[7px] lg:line-clamp-4 lg:max-h-14 lg:text-[10px]",
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

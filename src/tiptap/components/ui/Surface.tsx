import { cn } from "@/lib/utils";
import { HTMLProps, forwardRef } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export type SurfaceProps = HTMLProps<HTMLDivElement> & {
  withShadow?: boolean;
  withBorder?: boolean;
};

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  (
    { children, className, withShadow = true, withBorder = true, ...props },
    ref,
  ) => {
    const surfaceClass = cn(
      className,
      montserrat.className,
      "bg-white rounded-lg dark:bg-dark-primary dark:bg-[#595b9e] dark:text-white",
      withShadow ? "shadow-sm" : "",
      withBorder ? "border border-neutral-200 dark:border-neutral-300" : "",
    );

    return (
      <div className={surfaceClass} {...props} ref={ref}>
        {children}
      </div>
    );
  },
);

Surface.displayName = "Surface";

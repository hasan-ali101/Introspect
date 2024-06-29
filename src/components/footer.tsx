import Image from "next/image";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <div
      className={cn(
        "hidden h-52 w-full justify-center overflow-clip transition-opacity dark:flex ",
      )}
    >
      <div className="w-full bg-dark-secondary">
        <Image
          src="/footer.png"
          alt="footer"
          width={1000}
          height={500}
          className="h-80 w-full min-w-[1000px] opacity-20"
        />
      </div>
    </div>
  );
};
export default Footer;

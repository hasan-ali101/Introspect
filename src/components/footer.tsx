import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Footer = () => {
  const [show, setShow] = useState(false);

  setTimeout(() => {
    setShow(true);
  }, 300);

  return (
    <div
      className={cn(
        show ? "opacity-100" : "opacity-0",
        "hidden h-52 w-full justify-center overflow-clip transition-opacity dark:flex ",
      )}
    >
      <Image
        src="/footer.png"
        alt="footer"
        width={1000}
        height={500}
        className="h-80 w-full min-w-[1000px] opacity-20"
      />
    </div>
  );
};
export default Footer;

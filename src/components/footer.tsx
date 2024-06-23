import Image from "next/image";

const Footer = () => (
  <div className="absolute bottom-0 mt-6 hidden h-52 w-full justify-center overflow-clip dark:flex">
    <Image
      src="/footer.png"
      alt="footer"
      width={1000}
      height={500}
      className="h-80 w-full min-w-[1000px] opacity-20"
    />
  </div>
);
export default Footer;

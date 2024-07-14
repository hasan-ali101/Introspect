import Image from "next/image";
// import { ReactTyped } from "react-typed";

const Loader = () => (
  <div className="flex h-96 w-full animate-pulse flex-col items-center justify-center gap-2">
    <div className="flex flex-col items-center rounded-full border-2 bg-dark-tertiary p-8">
      <Image
        src="/logo-white.png"
        alt="Introspect Logo"
        width={60}
        height={60}
        className="mb-2 h-24 w-24"
      />
      <p>Loading...</p>
      {/* <ReactTyped strings={["Loading..."]} typeSpeed={100} loop /> */}
    </div>
  </div>
);

export default Loader;

export default function BackgroundImage() {
  return (
    <div
      className="absolute -z-10 -mt-12 hidden h-full w-full opacity-40 transition-opacity dark:flex sm:-m-10 md:animate-stars"
      style={{
        backgroundImage: `url("/stars2.png")`,
        backgroundSize: "cover",
      }}
    >
      <div className="h-1 w-1 animate-shooting-star rounded-full bg-white md:animate-shooting-star-slow"></div>
      <div className="h-1 w-1 animate-shooting-star-2 rounded-full bg-white"></div>
    </div>
  );
}

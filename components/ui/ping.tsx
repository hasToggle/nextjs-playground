export function Ping() {
  return (
    <span className="absolute right-0 top-3 -mr-1 -mt-1 flex h-3 w-3">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-80"></span>
      <span className="relative inline-flex h-3 w-3 rounded-full bg-pink-500"></span>
    </span>
  );
}

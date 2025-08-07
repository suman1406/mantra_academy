export function Mandala() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-full h-full animate-[slow-spin_20s_linear_infinite] animate-[glow_5s_ease-in-out_infinite]"
    >
      <defs>
        <path
          id="petal"
          d="M 50 0 A 50 50 0 0 1 75 13.4 L 50 50 Z"
          className="fill-accent/70"
        />
      </defs>
      <circle cx="50" cy="50" r="48" className="stroke-accent/50 fill-none" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="35" className="stroke-accent/40 fill-none" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="22" className="stroke-accent/30 fill-none" strokeWidth="0.5" />
      <g>
        {[...Array(12)].map((_, i) => (
          <use key={i} href="#petal" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="10" className="fill-accent" />
    </svg>
  );
}

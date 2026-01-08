const barColors = [
  "var(--color-laranja)",
  "var(--color-roxo)",
  "var(--color-verde)",
];

export default function ColorBar({ blocks = 15 }) {
  return (
    <div
      className="absolute left-0 bottom-0 w-full h-1 flex"
      aria-hidden="true"
    >
      {Array.from({ length: blocks }).map((_, i) => (
        <div
          key={i}
          className="h-full flex-1"
          style={{ background: barColors[i % barColors.length] }}
        />
      ))}
    </div>
  );
}

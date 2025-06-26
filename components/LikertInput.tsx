"use client";

interface Props {
  onSelect(value: number): void;
}

export default function LikertInput({ onSelect }: Props) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          className="h-8 w-8 rounded-full border text-sm hover:bg-gray-200"
          onClick={() => onSelect(n)}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
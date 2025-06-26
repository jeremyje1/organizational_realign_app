"use client";

import { useState } from "react";

interface Props {
  onSubmit(value: number): void;
}

export default function NumericInput({ onSubmit }: Props) {
  const [val, setVal] = useState("");

  return (
    <div className="flex gap-2">
      <input
        type="number"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="border rounded px-2 py-1 w-28"
      />
      <button
        className="bg-blue-600 text-white px-3 rounded"
        onClick={() => {
          const parsed = Number(val);
          if (!isNaN(parsed)) onSubmit(parsed);
        }}
      >
        Save
      </button>
    </div>
  );
}
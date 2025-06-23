"use client";

export function PriorityMatrix() {
  return (
    <div className="card mt-6">
      <h2 className="text-lg font-semibold mb-2">Action Priority Matrix (Impact vs. Effort)</h2>
      <div className="relative aspect-square border border-gray-300 bg-white dark:bg-gray-800">
        <div className="absolute top-1/2 w-full border-t border-dashed border-gray-400"></div>
        <div className="absolute left-1/2 h-full border-l border-dashed border-gray-400"></div>
        <p className="absolute top-1 left-2 text-xs text-gray-500">High Impact / Low Effort</p>
        <p className="absolute top-1 right-2 text-xs text-gray-500">High Impact / High Effort</p>
        <p className="absolute bottom-1 left-2 text-xs text-gray-500">Low Impact / Low Effort</p>
        <p className="absolute bottom-1 right-2 text-xs text-gray-500">Low Impact / High Effort</p>
      </div>
    </div>
  );
}
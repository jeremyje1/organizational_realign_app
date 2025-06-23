

 "use client";

export default function RoleList({ roles }: { roles: { id: string; name: string; tag?: string }[] }) {
  return (
    <div className="mt-6">
      {roles.map((role) => (
        <div key={role.id} className="mb-2">
          <p className="text-sm font-medium">{role.name}</p>
          <p className="text-xs text-gray-500">
            <span
              className={`inline-block px-2 py-1 rounded text-white text-xs ${
                role.tag === "critical"
                  ? "bg-red-600"
                  : role.tag === "open"
                  ? "bg-yellow-500"
                  : role.tag === "redundant"
                  ? "bg-gray-600"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {role.tag || "Uncategorized"}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
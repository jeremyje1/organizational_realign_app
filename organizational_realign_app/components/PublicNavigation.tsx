import Link from "next/link";
import type { Route } from "next";

export default function PublicNavigation() {
  return (
    <nav className="bg-white shadow-sm px-6 py-3 mb-6" role="navigation" aria-label="Main navigation">
      <ul className="flex space-x-4 text-sm font-medium text-gray-700">
        <li>
          <Link
            href={"/" as Route}
            className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={"/survey" as Route}
            className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
          >
            Survey
          </Link>
        </li>
        <li>
          <Link
            href={"/assessment/secure-access" as Route}
            className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
          >
            Assessment
          </Link>
        </li>
        <li>
          <Link
            href={"/contact" as Route}
            className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

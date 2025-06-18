"use client";
import * as React from "react";

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`block w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
                  ${props.className ?? ""}`}
    />
  );
}
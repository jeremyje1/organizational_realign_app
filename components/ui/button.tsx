"use client";
import * as React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

function Button({ variant = "primary", className = "", ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition";
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-900 hover:bg-gray-50",
  }[variant];

  return <button className={`${base} ${styles} ${className}`} {...rest} />;
}

export default Button;
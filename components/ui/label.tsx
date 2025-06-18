"use client";
import * as React from "react";

export default function Label(
  props: React.LabelHTMLAttributes<HTMLLabelElement>
) {
  return (
    <label
      {...props}
      className={`mb-1 block text-sm font-medium text-gray-700 ${props.className ?? ""}`}
    />
  );
}
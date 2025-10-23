import React from "react";

export default function ProgressBar({
  value,
  color = "blue",
}: {
  value: number;
  color?: "blue" | "green" | "orange";
}) {
  const colorClasses =
    color === "green"
      ? "bg-green-500"
      : color === "orange"
      ? "bg-orange-500"
      : "bg-blue-500";

  return (
    <div className="w-full bg-gray-200 h-2.5 rounded-full mt-2">
      <div
        className={`${colorClasses} h-2.5 rounded-full`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

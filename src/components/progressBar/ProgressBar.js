import React from "react";

export default function ProgressBar({ name, percentage }) {
  const progressWidth = Math.round((percentage / 100) * 12);
  const classWidth = `bg-slate-800 w-${progressWidth}/12 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full`;
  return (
    <div className="mt-4">
      <p className="mb-2">{name}</p>
      <div className="w-full bg-gray-200 rounded-full mb-2">
        <div className={classWidth}>{percentage + "%"}</div>
      </div>
    </div>
  );
}

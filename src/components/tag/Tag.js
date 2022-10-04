import React from "react";

export default function Tag({ tagName }) {
  return (
    <div className="bg-gray-600 text-white py-1 px-2 rounded-md m-1 drop-shadow-sm">
      {tagName}
    </div>
  );
}

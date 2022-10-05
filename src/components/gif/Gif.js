import React from "react";
import Tag from "../tag/Tag";

export default function Gif({ gifKey, url, onGifClik, name, tags }) {
  const getTags = () => {
    return tags.map((tagName, index) => {
      return <Tag tagName={tagName} key={index} />;
    });
  };
  return (
    <div
      className="flex flex-col items-center gap-1"
      onClick={() => {
        onGifClik(gifKey);
      }}
    >
      <div
        className="w-40 h-40 border border-slate-100 rounded-md flex items-center justify-center relative"
        data-modal="gif-modal"
      >
        <div className="absolute top-1 left-1 right-1 flex flex-wrap text-xs">
          {tags && getTags()}
        </div>
        <img className="w-full h-auto" src={url} alt="gif" />
      </div>
      <div>
        <h3 className="font-medium">{name}</h3>
      </div>
    </div>
  );
}

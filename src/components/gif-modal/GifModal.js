import React, { useRef, useState } from "react";
import GifModalTag from "../gif-modal-tag/GifModalTag";
import toast, { Toaster } from "react-hot-toast";

export default function GifModal({
  gifKey,
  name,
  currentTags,
  publicUrl,
  setShowModal,
  onGifSaveClick,
  onGifDeleteClick,
}) {
  if (!currentTags) {
    currentTags = [];
  }
  const urlObj = window.location;
  const [newName, setNewName] = useState(name);
  const [tags, setTags] = useState(currentTags);
  const copyUrl = useRef(null);
  const getGifTags = () => {
    return tags.map((tagName, index) => {
      return (
        <GifModalTag
          tagName={tagName}
          key={index}
          index={index}
          removeTag={removeTag}
        />
      );
    });
  };

  const checkNameValidity = () => {
    let pattern = /^.*\.(gif)$/;
    return pattern.test(newName);
  };

  const onEnterTagInputKeyDown = (e) => {
    if (e.key === "Enter") {
      const clonedTags = [...tags];
      clonedTags.push(e.target.value);
      setTags(clonedTags);
      e.target.value = null;
    }
  };

  const removeTag = (index) => {
    console.log(index);
    const clonedTags = [...tags];
    clonedTags.splice(index, 1);
    setTags(clonedTags);
  };

  const onNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const onSaveClick = () => {
    if (!checkNameValidity()) {
      toast.error("GIF name is invalid!");
    }
    onGifSaveClick({ gifKey, newName, tags });
    console.log(newName, tags);
  };

  const onDeleteClick = () => {
    onGifDeleteClick(gifKey);
  };

  const conCopyClick = () => {
    if (copyUrl.current.value) {
      navigator.clipboard.writeText(copyUrl.current.value);
    }
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-700/40 flex items-center justify-center modal-wrapper"
      id="gif-modal"
      tabIndex={-1}
    >
      <div className="w-1/2 h-1/2 bg-white rounded-md drop-shadow-md p-4 flex flex-col">
        <div className="flex-1 self-stretch">
          <div>
            <label htmlFor="gif-name-input" className="font-bold block w-full">
              Name
            </label>
            <input
              className="border px-2 py-1 mt-1 rounded-md text-gray-900 w-full outline-1 outline-blue-100"
              id="gif-name-input"
              type="text"
              value={newName}
              onChange={(e) => {
                onNewNameChange(e);
              }}
              required=""
            />
          </div>
          <div className="my-4">
            <label htmlFor="gif-add-tag" className="font-bold block w-full">
              Tags
            </label>
            <div className="my-2 flex flex-wrap">
              {tags.length > 0 && getGifTags()}
              <input
                id="gif-add-tag"
                className="ml-2 outline-0"
                placeholder="Add a new tag..."
                onKeyDown={(e) => {
                  onEnterTagInputKeyDown(e);
                }}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="gif-sharing-url" className="font-bold block w-full">
            Public URL
          </label>
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              readOnly
              ref={copyUrl}
              value={`${urlObj.origin}/sharedView/${publicUrl}`}
              className="block p-2.5 w-full z-20 text-sm  rounded-lg border-l-2 border text-gray-400 text-sm font-semibold rounded-md bg-gray-100"
            />
            <button
              type="submit"
              onClick={() => {
                conCopyClick();
              }}
              className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Copy
            </button>
          </div>
        </div>
        <div className="text-right">
          <button
            className="py-1 px-8 bg-red-800 text-white rounded-md text-lg cursor-pointer font-semibold m-1"
            onClick={() => {
              onDeleteClick();
            }}
          >
            Delete
          </button>
          <button
            className="py-1 px-8 bg-slate-800 text-white rounded-md text-lg cursor-pointer font-semibold m-1"
            onClick={() => {
              onSaveClick();
            }}
          >
            Save
          </button>
          <button
            className="py-1 px-8 bg-gray-400 text-white rounded-md text-lg cursor-pointer font-semibold m-1"
            data-close-modal=""
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

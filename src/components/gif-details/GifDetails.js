import React from "react";

export default function GifDetails() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-700/40 flex items-center justify-center modal-wrapper hidden"
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
              defaultValue="demo-gif-1.gif"
              required=""
            />
          </div>
          <div className="my-4">
            <label htmlFor="gif-add-tag" className="font-bold block w-full">
              Tags
            </label>
            <div className="my-2 flex flex-wrap">
              <span className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease mr-1">
                Tag 1
                <button className="bg-transparent hover focus:outline-none">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="times"
                    className="w-3 ml-3"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 352 512"
                  >
                    <path
                      fill="currentColor"
                      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                    ></path>
                  </svg>
                </button>
              </span>
              <span className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease mr-1">
                Tag 2
                <button className="bg-transparent hover focus:outline-none">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="times"
                    className="w-3 ml-3"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 352 512"
                  >
                    <path
                      fill="currentColor"
                      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                    ></path>
                  </svg>
                </button>
              </span>
              <span className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease mr-1">
                Tag 3
                <button className="bg-transparent hover focus:outline-none">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="times"
                    className="w-3 ml-3"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 352 512"
                  >
                    <path
                      fill="currentColor"
                      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                    ></path>
                  </svg>
                </button>
              </span>
              <input
                id="gif-add-tag"
                className="ml-2 outline-0"
                placeholder="Add a new tag..."
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="gif-sharing-url" className="font-bold block w-full">
            Public URL
          </label>
          <input
            id="gif-sharing-url"
            type="text"
            disabled=""
            className="mb-4 mt-1 w-full p-2 text-gray-400 text-sm font-semibold rounded-md bg-gray-100"
            defaultValue="http://localhost/g/fn839nd3i2od1d89ni2d"
          />
        </div>
        <div className="text-right">
          <button className="py-1 px-8 bg-slate-800 text-white rounded-md text-lg cursor-pointer font-semibold">
            Save
          </button>
          <button
            className="py-1 px-8 bg-gray-400 text-white rounded-md text-lg cursor-pointer font-semibold"
            data-close-modal=""
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

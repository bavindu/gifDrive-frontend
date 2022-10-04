import React from "react";
import ProgressBar from "../progressBar/ProgressBar";
import "./upladerModal.css";

export default function UploadingModal({ files, progressInfos }) {
  return (
    <div className="py-4 px-4 my-4 mx-4 bg-white rounded-md drop-shadow-md fixed right-0 bottom-0 downloading">
      <h2 className="text-lg font-medium">Uploading...</h2>
      {files &&
        files.map((file, index) => {
          return (
            <ProgressBar
              key={index}
              name={file.name}
              percentage={progressInfos[index] ? progressInfos[index] : 0}
            />
          );
        })}
    </div>
  );
}

import React, { useState } from "react";
import Dropzone from "react-dropzone";
import gifService from "../../services/gif.service";
import UploadingModal from "../uploadingModal/UploadingModal";
import toast, { Toaster } from "react-hot-toast";
import "./gif-uploader.css";

export default function GifUploader({ loadGifData }) {
  const [files, setFiles] = useState([]);
  const [progressInfos, setProgressInfos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const handleDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      console.log("file type", file.type);
      if (file.type == "image/gif") {
        setFiles([...files, file]);
      }
    });
  };

  const onUploadClick = () => {
    setIsUploading(true);
    if (files.length > 0) {
      const uploadFilePromiser = [];
      files.forEach((file, i) => {
        uploadFilePromiser.push(
          gifService.uploadGif(file, (progressEvent) => {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            let newProgressInfos = [...progressInfos];
            newProgressInfos[i] = percentCompleted;
            setProgressInfos(newProgressInfos);
            console.log("percentageList", progressInfos);
          })
        );
      });
      Promise.all(uploadFilePromiser)
        .then((res) => {
          console.log("Promise all res", res);
          console.log("after upload successfull", progressInfos);
          setIsUploading(false);
          setProgressInfos([]);
          setFiles([]);
          toast.success("GIFs Upload Successfull");
          loadGifData();
        })
        .catch((error) => {
          console.error("upload error", error);
          setIsUploading(false);
          toast.error("GIFs Upload Error");
        });
    }
  };

  return (
    <>
      <div>
        <div className="container my-8 mx-auto flex justify-center">
          <Dropzone
            onDrop={handleDrop}
            accept="image/gif"
            minSize={1024}
            maxSize={3072000}
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject,
            }) => {
              const additionalClass = isDragAccept
                ? "accept"
                : isDragReject
                ? "reject"
                : "";

              return (
                <div
                  {...getRootProps({
                    className: `dropzone ${additionalClass}`,
                  })}
                >
                  <input {...getInputProps()} />
                  <span>{isDragActive ? "📂" : "📁"}</span>
                  <p>Drag'n'drop GIFs, or click to select files</p>
                </div>
              );
            }}
          </Dropzone>
        </div>
        <div>
          <button
            className="bg-slate-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              onUploadClick();
            }}
          >
            Upload
          </button>
        </div>
        <div>
          {files.length > 0 && <strong>Files:</strong>}
          <ul>
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
        {isUploading && (
          <UploadingModal files={files} progressInfos={progressInfos} />
        )}
      </div>
    </>
  );
}

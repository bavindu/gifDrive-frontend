import React, { useState } from "react";
import Dropzone from "react-dropzone";
import gifService from "../../services/gif.service";
import UploadingModal from "../uploadingModal/UploadingModal";
import toast, { Toaster } from "react-hot-toast";
import "./gif-uploader.css";

export default function GifUploader({ loadGifData, uploadedGifName }) {
  const [files, setFiles] = useState([]);
  const [progressInfos, setProgressInfos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const handleDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      console.log("file type", file.type);
      if (file.type == "image/gif") {
        if (
          files.find((item) => item.name == file.name) ||
          uploadedGifName.find((item) => item == file.name)
        ) {
          toast.error(`${file.name} already exist`);
        } else {
          if (file.size > 10000000) {
            toast.error(`File Size of ${file.name} is Greated than 10MB`);
          } else {
            setFiles([...files, file]);
          }
        }
      } else {
        toast.error(`${file.name} Invalid File Type`);
      }
    });
  };

  const onUploadClick = () => {
    if (files.length > 0) {
      setIsUploading(true);
      const uploadFilePromiser = [];
      files.forEach((file, i) => {
        uploadFilePromiser.push(
          gifService.uploadGif(file, (progressEvent) => {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(file.name, i, percentCompleted);
            console.log("Before percentageList", progressInfos);
            const copyProgressInfos = [...progressInfos];
            copyProgressInfos[i] = percentCompleted;
            setProgressInfos(copyProgressInfos);
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
          <Dropzone onDrop={handleDrop} accept="image/gif">
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
      <Toaster />
    </>
  );
}

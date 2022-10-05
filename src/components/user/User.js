import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import gifService from "../../services/gif.service";
import userService from "../../services/user.service";
import GifDetails from "../gif-details/GifDetails";
import GifModal from "../gif-modal/GifModal";
import GifUploader from "../gif-uploader/GifUploader";
import Gif from "../gif/Gif";
import UploadingModal from "../uploadingModal/UploadingModal";

export default function User() {
  const navigate = useNavigate();
  const isUploading = false;
  const [userObj, setUserObj] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedGif, setSelectedGif] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await userService.getUser();
      if (res && res.data) {
        const user = res.data;
        console.log("user", user);
        setUserObj(user);
      } else {
        authService.logOut();
        navigate("/login");
      }
    };
    getUser().catch((error) => {
      console.error(error);
      authService.logOut();
      navigate("/login");
    });
  }, []);

  const onGifClik = (gif) => {
    setSelectedGif(gif);
    setShowModal(true);
    console.log(showModal);
    console.log("Gif Click");
  };

  const getGifList = () => {
    return userObj.gifsList.map((gif, index) => {
      return (
        <Gif
          gif={gif}
          userID={userObj.userID}
          key={index}
          name={userObj.gifsNames[gif.name]}
          tags={userObj.gifsTags[gif.name]}
          onGifClik={onGifClik}
        />
      );
    });
  };

  const onLogOutClick = () => {
    authService.logOut();
    navigate("/login");
  };

  const loadGifData = async () => {
    const res = await userService.getUser();
    if (res && res.data) {
      const user = res.data;
      console.log("user", user);
      setUserObj(user);
    }
  };

  const onGifSaveClick = async (gifSaveObj) => {
    const payLoad = {
      key: gifSaveObj.gif.name,
      newName: gifSaveObj.newName,
      tags: gifSaveObj.tags,
      email: userObj.email,
      userID: userObj.userID,
    };
    setShowModal(false);
    const res = await gifService.updateGif(payLoad);
    if (res) {
      toast.success("Gif Updated");
      loadGifData();
    } else {
      toast.error("Gif Update Error");
    }
  };

  const onGifDeleteClick = async (gif) => {
    const payload = {
      email: userObj.email,
      key: gif.name,
    };
    const deleteRes = await gifService.deleteGif(payload);
    if (deleteRes) {
      toast.success("Gif Deleted");
      loadGifData();
    } else {
      toast.error("Gif Delete Error");
    }
    setShowModal(false);
  };

  return (
    <>
      <nav className="w-full bg-slate-800 flex items-center justify-between py-2 px-8">
        <div>
          <h1 className="text-3xl text-white">
            <a href="#">Gifs Drive</a>
          </h1>
        </div>
        <div className="flex gap-4 text-white text-lg">
          <button
            onClick={() => {
              onLogOutClick();
            }}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="container my-6 mx-auto">
        <input
          placeholder="Search your GIFs by name or tags..."
          className="py-4 px-4 w-full drop-shadow-sm rounded-md outline-blue-100"
        />
      </div>
      <div className="container my-8 mx-auto flex justify-center">
        <div className="w-full xl:w-2/3">
          <div className="py-4 px-4 my-4 bg-white rounded-md drop-shadow-sm flex flex-wrap items-center gap-4">
            {userObj &&
              userObj.gifsList &&
              userObj.gifsList.length > 0 &&
              getGifList()}
          </div>
        </div>
      </div>
      <div className="container my-8 mx-auto flex justify-center">
        <div>
          <GifUploader loadGifData={loadGifData} />
        </div>
      </div>
      {showModal && (
        <GifModal
          gif={selectedGif}
          userID={userObj.userID}
          name={userObj.gifsNames[selectedGif.name]}
          currentTags={userObj.gifsTags[selectedGif.name]}
          publicUrl={userObj.gifsPublicUrls[selectedGif.name]}
          setShowModal={setShowModal}
          onGifSaveClick={onGifSaveClick}
          onGifDeleteClick={onGifDeleteClick}
        />
      )}
      {isUploading && <UploadingModal />}
      <Toaster />
    </>
  );
}

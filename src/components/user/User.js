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
  console.log("User View Intialized");
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedGifKey, setSelectedGifKey] = useState(null);
  const [displayGifObjectList, setDisplayGifObjectList] = useState([]);
  const [realGifObjectList, setRealGifObjectList] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await userService.getUser();
      if (res && res.data) {
        const user = res.data;
        console.log("user", user);
        setUserObj(user);
        generateGifObjecList(user);
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

  const generateGifObjecList = (user) => {
    const gifObjectList = [];
    user.gifsList.forEach((item) => {
      const key = item.name;
      const obj = {
        key: key,
        url: item.url,
        name: user.gifsNames[key],
        tags: user.gifsTags[key],
      };
      gifObjectList.push(obj);
    });
    if (gifObjectList.length > 0) {
      setDisplayGifObjectList([...gifObjectList]);
      setRealGifObjectList([...gifObjectList]);
    }
  };

  const getGifList = () => {
    return displayGifObjectList.map((item, index) => {
      return (
        <Gif
          gifKey={item.key}
          url={item.url}
          key={index}
          name={item.name}
          tags={item.tags}
          onGifClik={onGifClik}
        />
      );
    });
  };

  const onGifClik = (gifkey) => {
    setSelectedGifKey(gifkey);
    setShowModal(true);
    console.log(showModal);
    console.log("Gif Click");
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
      generateGifObjecList(user);
    }
  };

  const onGifSaveClick = async ({ gifKey, newName, tags }) => {
    const payLoad = {
      key: gifKey,
      newName: newName,
      tags: tags,
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

  const onGifDeleteClick = async (gifKey) => {
    const payload = {
      email: userObj.email,
      key: gifKey,
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

  const onChangeSearchText = (value) => {
    console.log(value);
    if (value && value.length > 0) {
      const result = realGifObjectList.filter((gifObj) => {
        return (
          gifObj.name.includes(value) ||
          gifObj.tags.find((item) => item.includes(value))
        );
      });
      setDisplayGifObjectList([...result]);
    } else {
      setDisplayGifObjectList([...realGifObjectList]);
    }
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
      {userObj && (
        <div>
          <div className="container my-6 mx-auto">
            <input
              placeholder="Search your GIFs by name or tags..."
              className="py-4 px-4 w-full drop-shadow-sm rounded-md outline-blue-100"
              onChange={(e) => {
                onChangeSearchText(e.target.value);
              }}
            />
          </div>
          <div className="container my-8 mx-auto flex justify-center">
            <div className="w-full xl:w-2/3">
              <div className="py-4 px-4 my-4 bg-white rounded-md drop-shadow-sm flex flex-wrap items-center gap-4">
                {userObj.gifsList &&
                  userObj.gifsList.length > 0 &&
                  getGifList()}
              </div>
            </div>
          </div>
          <div className="container my-8 mx-auto flex justify-center">
            <div>
              <GifUploader
                loadGifData={loadGifData}
                uploadedGifName={Object.values(userObj.gifsNames)}
              />
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <GifModal
          gifKey={selectedGifKey}
          name={userObj.gifsNames[selectedGifKey]}
          currentTags={userObj.gifsTags[selectedGifKey]}
          publicUrl={userObj.gifsPublicUrls[selectedGifKey]}
          setShowModal={setShowModal}
          onGifSaveClick={onGifSaveClick}
          onGifDeleteClick={onGifDeleteClick}
        />
      )}
      <Toaster />
    </>
  );
}

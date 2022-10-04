import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authService from "../../services/auth.service";
import gifService from "../../services/gif.service";
import userService from "../../services/user.service";
import utilService from "../../utils/util.service";

export default function SharedGifView() {
  const navigate = useNavigate();
  const { gifPublicLink } = useParams();
  const [publicGif, setPublicGif] = useState(null);
  const onLogOutClick = () => {
    authService.logOut();
    navigate("/login");
  };
  console.log("On Gif Public view");
  useEffect(() => {
    const getUser = async () => {
      if (!(utilService.getToken() && gifPublicLink)) {
        navigate("/login", { state: { gifUrl: gifPublicLink } });
      } else {
        let res = await userService.getUser();
        let gifRes = await gifService.getGifByPublicUrl(gifPublicLink);
        if (res && res.data && gifRes && gifRes.data) {
          const user = res.data;
          setPublicGif(gifRes.data);
        } else {
          authService.logOut();
          navigate("/login", { state: { gifUrl: gifPublicLink } });
        }
      }
    };
    getUser();
  }, []);
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
      <div className="container my-8 mx-auto flex justify-center">
        <img src={publicGif && publicGif.url} />
      </div>
      <div className="container my-8 mx-auto flex justify-center">
        <h1>{publicGif && publicGif.name}</h1>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TOKEN_KEY from "../../constant/app";
import authService from "../../services/auth.service";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //load user page if there is a token
    console.log("location", location);
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      navigate("/user");
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const validateInputs = () => {
    let errorList = [];
    setEmail(email.trim());
    setPassword(password.trim());
    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    const validPassword = password.length > 0;
    if (!validEmail) {
      errorList.push("Invalid Email");
    }
    if (!validPassword) {
      errorList.push("Empty Password");
    }
    if (errorList.length > 0) {
      let errorMsg = "";
      errorList.forEach((item) => (errorMsg = errorMsg + item + "\n"));
      toast.error(errorMsg);
      return false;
    } else {
      return true;
    }
  };

  const onSubmitClick = async (e) => {
    e.preventDefault();
    console.log(email, password);
    if (validateInputs()) {
      const res = await authService.authenticate(email, password);
      if (res.data) {
        if (location.state && location.state.gifUrl) {
          navigate(`/sharedView/${location.state.gifUrl}`);
        } else {
          navigate("/user");
        }
      } else if (res.error) {
        toast.error(res.error);
      }
    }
  };

  return (
    <div>
      <nav className="w-full bg-slate-800 flex items-center justify-between py-2 px-8">
        <div>
          <h1 className="text-3xl text-white">
            <a href="#">Gifs Drive</a>
          </h1>
        </div>
        <div className="flex gap-4 text-white text-lg">
          <Link to={"/register"}>Register</Link>
        </div>
      </nav>
      <main className="container my-8 mx-auto flex justify-center">
        <div className="w-full xl:w-1/2 py-4 px-8 border-2 border-slate-100 rounded-md">
          <h1 className="text-xl font-medium text-center">
            Login To Your Account
          </h1>
          <form className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-lg font-medium">
                Enter Email
              </label>
              <input
                className="w-full outline-none border-slate-100 border p-2 rounded-md focus:border-slate-800 focus:border-2"
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="john@example.com"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-lg font-medium">
                Enter Password
              </label>
              <input
                className="w-full outline-none border-slate-100 border p-2 rounded-md focus:border-slate-800 focus:border-2"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="**************"
              />
            </div>
            <div>
              <input
                type="submit"
                defaultValue="Login"
                onClick={(e) => {
                  onSubmitClick(e);
                }}
                className="py-1 px-8 bg-slate-800 text-white rounded-md text-lg cursor-pointer"
              />
            </div>
          </form>
          <div className="flex mt-8 justify-center">
            <h2 className="text-lg">
              Don't have an account?
              <Link className="underline" to={"/register"}>
                Create A New Account
              </Link>
            </h2>
          </div>
        </div>
        <Toaster />
      </main>
    </div>
  );
}

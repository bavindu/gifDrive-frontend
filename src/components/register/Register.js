import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notify = (message, isSuccess) => {
    isSuccess ? toast.success(message) : toast.error(message);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const onNotifyClick = (e) => {
    e.preventDefault();
    notify();
  };

  const onRegisterClick = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    const registerRes = await authService.register(name, email, password);
    if (registerRes) {
      setName("");
      setEmail("");
      setPassword("");
      notify("Registered Sccuessfull", true);
    } else {
      notify("Registered Error");
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
          <Link to={"/login"}>Login</Link>
        </div>
      </nav>
      <main className="container my-8 mx-auto flex justify-center">
        <div className="w-full xl:w-1/2 py-4 px-8 border-2 border-slate-100 rounded-md">
          <h1 className="text-xl font-medium text-center">
            Create A New Account
          </h1>
          <form className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-lg font-medium">
                Enter Name
              </label>
              <input
                className="w-full outline-none border-slate-100 border p-2 rounded-md focus:border-slate-800 focus:border-2"
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="John Doe"
              />
            </div>
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
                defaultValue="Register"
                onClick={(e) => {
                  onRegisterClick(e);
                }}
                className="py-1 px-8 bg-slate-800 text-white rounded-md text-lg cursor-pointer"
              />
            </div>
          </form>
          <div className="flex mt-8 justify-center">
            <h2 className="text-lg">
              Already have an account?
              <Link className="underline" to={"/login"}>
                Click Here to Login
              </Link>
            </h2>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}

import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Error from "./Error";
import User from "./components/user/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="user" element={<User />}></Route>
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

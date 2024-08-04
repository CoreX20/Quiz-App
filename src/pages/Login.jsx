import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = ({ setUser }) => {
    if (username.trim() === "") {
      alert("Username harus diisi");
      return;
    }

    navigate("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 space-y-5">
      <h2 className="font-bold text-2xl">Login</h2>
      <div className="bg-white p-8 rounded-lg flex flex-col shadow-md py-5 px-10 space-y-2">
        <input
          className="w-full h-[55px] px-10 border border-black border-opacity-40 rounded-lg placeholder:text-lg-body placeholder:text-black placeholder:text-opacity-40"
          type="text"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full h-[55px] px-10 border border-black border-opacity-40 rounded-lg placeholder:text-lg-body placeholder:text-black placeholder:text-opacity-40"
          type="password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full h-[55px] px-10 btn bg-neutral-500"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

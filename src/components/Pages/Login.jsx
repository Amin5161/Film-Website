import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
export default function LoginComponent() {
  const { Login } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const { username, password } = e.target.elements;

    await Login(username.value, password.value, navigate);
    navigate("/profile",{replace:true});
  }

  return (
    <div>
      <form
        action=""
        onSubmit={handleLogin}
        className="flex flex-col gap-2 justify-center items-center"
      >
        <label htmlFor="username">UserName:</label>
        <input
          className="p-1 text-black"
          placeholder="UserName"
          type="text"
          id="username"
          name="username"
          required
        />
        <label htmlFor="password"> UserPassword</label>
        <input
          className="p-1 text-black"
          placeholder="UserPassword"
          type="password"
          id="password"
          name="password"
        />

        <input
          type="submit"
          value="Login"
          className="bg-slate-200 text-black w-12"
        />
      </form>
    </div>
  );
}

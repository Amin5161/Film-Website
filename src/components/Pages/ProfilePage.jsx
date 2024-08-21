import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, session } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(session);
  useEffect(() => {
    if (!session) {
      navigate("/login", { replace: true });
    }
  }, [session, navigate]);
  if (!session) {
    return null;
  }
  const imgUrl = user?.avatar?.tmdb?.avatar_path
    ? `https://image.tmdb.org/t/p/original${user.avatar.tmdb.avatar_path}`
    : "https://via.placeholder.com/150";
  return (
    <div className="flex items-center gap-8">
      <img className="rounded-full w-20 h-20 object-cover " src={imgUrl} alt="avatar-profile" />
      <h2>{user.name}</h2>
    </div>
  );
}
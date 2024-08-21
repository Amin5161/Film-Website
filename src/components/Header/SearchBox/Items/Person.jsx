import React from "react";

export default function Person({ item }) {
  // بررسی وجود تصویر
  const imageUrl = item.profile_path
    ? `https://image.tmdb.org/t/p/w45${item.profile_path}`
    : "/images/default-avatar-profile-icon-social-600nw-1677509740.webp"; // مسیر تصویر پیش‌فرض

  return (
    <div className="flex items-center p-1  hover:bg-gray-100 cursor-pointer">
      <img
        src={imageUrl}
        alt={item.name || "Profile Image"}
        className="w-14 h-14 object-cover rounded-lg mr-4"
      />
      <div>
        <ul className="list-none m-0 p-0 flex items-center gap-6">
          <li className="font-semibold mb-1">{item.name || item.title}</li>
          <li className="text-xs text-gray-500">{item.release_date}</li>
        </ul>
      </div>
    </div>
  );
}

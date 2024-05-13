import React from "react";

const Notifications = () => {
  return (
    <div
      style={{ borderRadius: "50%" }}
      className="w-12 h-12 pt-1 text-center bg-blue-500">
      <button className="relative p-2 text-gray-400 rounded-full hover:bg-blue-400 hover:text-blue-400 focus:bg-blue-400 focus:text-blue-400">
        <span className="sr-only">Notifications</span>
        <span className="absolute top-0 right-0 w-2 h-2 mt-1 mr-2 bg-red-500 rounded-full" />
        <span className="absolute top-0 right-0 w-2 h-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping" />
        <img src="/icons/notification.png" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Notifications;

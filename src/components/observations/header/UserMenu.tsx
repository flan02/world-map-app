import React, { useEffect, useRef, useState } from "react";

const UserMenu = () => {
  const [userMenuStatus, setUserMenuStatus] = useState(false);
  const buttonRef = useRef(null);

  const userMenuhandle = () => {
    setUserMenuStatus(!userMenuStatus);
  };

  return (

    <button
      className="relative inline-flex items-center p-2 rounded-lg hover:bg-gray-100 focus:bg-gray-100"
      onClick={userMenuhandle}
      ref={buttonRef}>
      <span className="w-12 h-12 ml-2 mr-2 overflow-hidden rounded-full bg-slate-900 sm:ml-3">
        <img
          src="/yo.jpg"
          alt="user profile photo"
          className="object-cover w-full h-full"
        />
      </span>
    </button>
  );
};

export default UserMenu;

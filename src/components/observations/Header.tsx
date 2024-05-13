import { MoonIcon } from "@heroicons/react/24/solid";
import React, { Dispatch, SetStateAction } from "react";
import Notifications from "./header/Notifications";
import UserMenu from "./header/UserMenu";

interface HeaderProps {
  mobileNavsidebar: boolean;
  setMobileNavsidebar: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  mobileNavsidebar,
  setMobileNavsidebar,
}) => {
  return (
    <header className="flex items-center w-full h-20 px-6 -ml-5 sm:px-10 bg-slate-900 text-slate-500">
      <MoonIcon
        className="h-12 cursor-pointer stroke-slate-600 sm:hidden"
        onClick={() => setMobileNavsidebar(!mobileNavsidebar)}
      />
      {/* <SearchBox /> */}
      <div className="text-2xl font-extrabold font-avenir">Observations</div>
      <div className="flex items-center flex-shrink-0 ml-auto">
        <Notifications />
        <UserMenu />
        {/* <div className="pl-3 ml-3 space-x-1 border-l">
          
          <LogOutButton />
        </div> */}
      </div>
    </header>
  );
};

export default Header;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  BoltIcon,
  CubeTransparentIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { App, Credentials } from "realm-web";

import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setUser } from "@/src/redux/slices/authSlice";
import { logOutUser } from "../redux/actions/auth";

const app = new App({ id: "echospectra-mobile-app-nxmob" });

const allFalseHovers = {
  dashboard: false,
  observations: false,
  tracks: false,
  assets: false,
};

interface hoveredProp {
  dashboard: boolean;
  observations: boolean;
  tracks: boolean;
  assets: boolean;
}

export default function SideNav() {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.authReducer.user);
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState<hoveredProp>(allFalseHovers);

  useEffect(() => {
    if (
      !isHovered.dashboard &&
      !isHovered.observations &&
      !isHovered.tracks &&
      !isHovered.assets
    ) {
      if (pathname == "/")
        setIsHovered({
          dashboard: true,
          observations: false,
          tracks: false,
          assets: false,
        });
      if (pathname == "/observations")
        setIsHovered({
          dashboard: false,
          observations: true,
          tracks: false,
          assets: false,
        });
    }
  }, [isHovered]);


  const handleLogout = async () => {
    try {
      // Calling the logOutUser function from the auth action.
      dispatch(logOutUser());


    } catch (error) {
      console.log(error);
    }
  };
  const clearHovers = () => {
    setIsHovered(allFalseHovers);
  };

  return (
    <aside
      className={`${false ? "block" : "hidden"
        } w-[20%] max-w-[350px] min-w-[275px] lg:flex lg:flex-col z-50 bg-slate-900 text-center py-4`}>
      <div className="flex justify-start mb-8 px-7 bg-slate-900">
        <Image
          width={160}
          height={10}
          className="object-cover"
          src="/logos/logo.png"
          alt="World map"
          priority
        />
      </div>
      <div className="flex flex-col flex-grow font-medium bg-slate-900 text-neutral-black-80">
        <Link
          href={"/"}
          className={` ${isHovered.dashboard
            ? "text-emerald-200"
            : "bg-slate-900"
            }`}
          onMouseEnter={() =>
            setIsHovered({
              dashboard: true,
              observations: false,
              tracks: false,
              assets: false,
            })
          }
          onMouseLeave={clearHovers}>
          <div className="flex items-center justify-start gap-3 px-12 my-3 group">
            <HomeIcon className="w-6 h-6 text-grey group-hover:text-emerald-200" />
            <span className="relative inline-flex items-center justify-between px-3 py-3 text-lg tracking-wide rounded-lg cursor-pointer text-shadow-dashboard font-avenir">
              Dashboard
            </span>
          </div>
        </Link>
        <Link
          href={"/observations"}
          className={` ${isHovered.observations
            ? " text-emerald-200"
            : "bg-slate-900"
            }`}
          onMouseEnter={() =>
            setIsHovered({
              dashboard: false,
              observations: true,
              tracks: false,
              assets: false,
            })
          }
          onMouseLeave={clearHovers}>
          <div className="flex items-center justify-start gap-3 px-12 my-3 group">
            <BoltIcon className="w-6 h-6 group-hover:text-emerald-200" />
            <span className="relative inline-flex items-center justify-between px-3 py-3 text-lg tracking-wide rounded-lg cursor-pointer group text-shadow-dashboard font-avenir">
              Observations
            </span>
          </div>
        </Link>
        <Link
          href={"#"}
          onMouseEnter={() =>
            setIsHovered({
              dashboard: false,
              observations: false,
              tracks: true,
              assets: false,
            })
          }
          onMouseLeave={clearHovers}
          className={` ${isHovered.tracks
            ? " text-emerald-200"
            : "bg-slate-900"
            }`}>
          <div className="flex items-center justify-start gap-3 px-12 my-3 group">
            <CubeTransparentIcon className="w-6 h-6 group-hover:text-emerald-200" />
            <span className="relative inline-flex items-center justify-between px-3 py-3 text-lg tracking-wide rounded-lg cursor-pointer group text-shadow-dashboard font-avenir">
              Tracks
            </span>
          </div>
        </Link>
        <Link
          href={"#"}
          onMouseEnter={() =>
            setIsHovered({
              dashboard: false,
              observations: false,
              tracks: false,
              assets: true,
            })
          }
          onMouseLeave={clearHovers}
          className={` ${isHovered.assets
            ? " text-emerald-200"
            : "bg-slate-900"
            }`}>
          <div className="flex items-center justify-start gap-3 px-12 my-3 group">
            <Square3Stack3DIcon className="w-6 h-6 group-hover:text-emerald-200" />
            <span className="relative inline-flex items-center justify-between px-3 py-3 text-lg tracking-wide rounded-lg cursor-pointer group text-shadow-dashboard font-avenir">
              Assets
            </span>
          </div>
        </Link>

      </div>
    </aside>
  );
}

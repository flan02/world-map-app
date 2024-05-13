"use client"; // This is a client component

// import type { ReactElement, ReactNode } from 'react';
// import NavLayout from '../layout';
import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";
import { emailAndPasswordLogin } from '@/src/redux/actions/auth'


const LoginPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.authReducer.user);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async () => {
    dispatch(emailAndPasswordLogin(email, password))
  };

  return (
    <div className="flex flex-col items-center justify-around w-full my-24 space-y-4 border jb border-slate-500 h-4/5">
      <div className="justify-between mt-4">
        <h1 className="text-2xl">
          Welcome to the <span className="text-5xl text-primary-blue-100"><span className="text-emerald-500">W</span>orld <span className="text-emerald-500">M</span>ap <span className="text-emerald-500">A</span>pp</span>
        </h1>
        <p className="mt-4 text-center text-white text-md">created by argentinian programmer Dan Chanivet.</p>
      </div>
      <div className="flex flex-col space-y-4">
        <p className="text-2xl font-medium text-center text-emerald-400">Login</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user email"
          className="h-12 border rounded w-72"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="h-12 border rounded w-72"
        />
        <button
          type="button"
          className="h-12 text-white rounded w-72 bg-emerald-400 hover:bg-emerald-500"
          onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

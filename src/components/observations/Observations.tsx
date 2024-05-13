import Image from "next/image";
import Link from "next/link";
import React, { useState, FC } from "react";
import Header from "./Header";
import ObservationsTitle from "./ObservationsTitle";
import ObservationsContent from "./ObservationsContent";

interface ViewType {
  viewType: number;
  setViewType: React.Dispatch<React.SetStateAction<number>>;
}

const Observations: FC = () => {
  const [viewType, setViewType] = useState<number>(1);

  return (
    <>
      <Header />
      <main className="w-full h-full p-6 -ml-5 space-y-6 sm:p-10 bg-slate-900">
        <div className="flex flex-col justify-between space-y-6 md:space-y-0 md:flex-row">
          <ObservationsTitle setViewType={setViewType} viewType={viewType} />
        </div>

        <section className="grid gap-6 md:grid-cols-1 xl:grid-cols-1">
          <ObservationsContent viewType={viewType} />
        </section>
      </main>
    </>
  );
};

export default Observations;

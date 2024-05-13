import React, { FC } from "react";

interface DataType {
  priority: string;
  observationDate: string;
  assigendTo: string;
}

interface ObservationsGridProps {
  data: DataType[];
}

const ObservationsGrid: FC<ObservationsGridProps> = ({ data }) => {
  return (
    <>
      <div className="flex justify-between mt-7 bg-slate-900">
        <div className="w-[30%] bg-slate-900">
          <div className="flex justify-between">
            <p>
              To Do<span className="pl-3 text-blue-400">3</span>
            </p>
            <div>
              <label>Sort by:</label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between bg-slate-900">
        <div className="w-[30%] rounded-lg bg-slate-600 p-4 flex flex-col gap-4 h-max">
          {data &&
            data.length &&
            data.map(
              (item) =>
                item.priority == "High" && (
                  <div className="p-4 px-6 rounded-lg bg-slate-400 text-zinc-600">
                    <div className="flex justify-between mb-3">
                      <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                          <img
                            src="icons/decatur.png"
                            style={{ width: "12px", height: "12px" }}
                          />
                          <span> Netherlands</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>{" "}
                          {item.priority}
                        </div>
                      </div>
                      <div>{item.observationDate}</div>
                    </div>
                    <div className="text-lg text-black">
                      Dangerous Pipe Line 6Xb near Brazil
                    </div>
                    <div className="flex justify-between mb-3 mt-7">
                      <div>Due Date</div>
                      <div>{item.assigendTo}</div>
                    </div>
                  </div>
                )
            )}
        </div>
        <div className="w-[30%] rounded-lg bg-slate-600  p-4 flex flex-col gap-4 h-max">
          {data &&
            data.length &&
            data.map(
              (item) =>
                item.priority == "Critical" && (
                  <div className="p-4 px-6 rounded-lg bg-slate-400 text-zinc-600">
                    <div className="flex justify-between mb-3">
                      <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                          <img
                            src="icons/decatur.png"
                            style={{ width: "12px", height: "12px" }}
                          />
                          <span> Canada</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>{" "}
                          {item.priority}
                        </div>
                      </div>
                      <div>{item.observationDate}</div>
                    </div>
                    <div className="text-lg text-black">
                      Exposed Pipe Line 4Xb near Canada
                    </div>
                    <div className="flex justify-between mb-3 mt-7">
                      <div>Due Date</div>
                      <div>{item.assigendTo}</div>
                    </div>
                  </div>
                )
            )}
        </div>
        <div className="w-[30%] rounded-lg bg-slate-600 p-4 flex flex-col gap-4 h-max">
          {data &&
            data.length &&
            data.map(
              (item) =>
                item.priority == "Maintenance" && (
                  <div className="p-4 px-6 rounded-lg bg-slate-400 text-zinc-600">
                    <div className="flex justify-between mb-3">
                      <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                          <img
                            src="icons/decatur.png"
                            style={{ width: "12px", height: "12px" }}
                          />
                          <span> Uruguay</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>{" "}
                          {item.priority}
                        </div>
                      </div>
                      <div>{item.observationDate}</div>
                    </div>
                    <div className="text-lg text-black">
                      Detected Pipe Line 2Xb near Uruguay
                    </div>
                    <div className="flex justify-between mb-3 mt-7">
                      <div>Due Date</div>
                      <div>{item.assigendTo}</div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </>
  );
};

export default ObservationsGrid;

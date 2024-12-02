import React from "react";

const LaptopView = () => {
  return (
    <>
      <div className="bg-[#181818] flex flex-col justify-center items-center py-16">
        <div className="inline-block">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FCFCFC] to-[#959595] bg-clip-text text-transparent">
            Start using PayPocket right now!
          </h2>
        </div>
        <div className=" w-[60%]">
          <img src="/laptop.png" alt="" className=" w-[100%]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-gray-200 px-16">
          <div className="p-4 text-center">
            <h3 className="text-3xl font-medium">32k</h3>
            <p className=" my-2">More than 32k people use Ahlan</p>
            <p className=" text-xs text-gray-400 w-3/5 text-center m-auto">
              More than 32k people have used our services, many have used Ahlan
            </p>
          </div>
          <div className="p-4 rounded-lg text-center">
            <h3 className="text-2xl font-bold">10k+</h3>
            <p className=" my-2">10k+ people download the app</p>
            <p className=" text-xs text-gray-400 w-3/5 text-center m-auto">
              More than 10k+ people download the app and try it. You have to try
            </p>
          </div>
          <div className="p-4 rounded-lg text-center">
            <h3 className="text-2xl font-bold">40k+</h3>
            <p className=" my-2">40k+ people helped</p>
            <p className=" text-xs text-gray-400 w-3/5 text-center m-auto">
              40k+ people have been helped by Ahlan&apos;s services, we are
              ready to help you
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaptopView;

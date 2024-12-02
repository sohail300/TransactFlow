import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, History } from "lucide-react";

const AhlanPromo = () => {
  const details = [
    {
      title: "On-Ramping",
      description: "Easily add money to your wallet",
      icon: <ArrowUpRight className="h-6 w-6" />,
    },
    {
      title: "Off-Ramping",
      description: "Withdraw funds to your bank account",
      icon: <ArrowDownRight className="h-6 w-6" />,
    },
    {
      title: "Peer Transfers",
      description: "Send money to other users instantly",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Transaction History",
      description: "View your complete financial activity",
      icon: <History className="h-6 w-6" />,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 w-full h-full absolute z-[-10]">
        <div className="h-[15vh] col-span-1 border border-slate-100"></div>
        <div className="h-[15vh] col-span-1 border border-slate-100"></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-1 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
        <div className="h-[15vh] col-span-3 border border-slate-100 "></div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 p-16 md:px-24 relative">
        <div className="flex-1 ">
          <div className="inline-block">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#515050] via-[#020202] to-[#404040] bg-clip-text text-transparent">
              Why To Choose
            </h2>
            <h2 className="text-5xl font-bold mb-0 bg-gradient-to-r from-[#515050] via-[#020202] to-[#404040] bg-clip-text text-transparent">
              And Use PayPocket?
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-4">
            {details.map((feature, index) => (
              <Card key={index} className="border-none bg-transparent">
                <CardContent className="flex flex-col items-start p-4">
                  <div className="mb-4 rounded-full shadow-lg p-3 bg-white">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2 ">{feature.title}</h3>
                  <p className="text-sm font-medium text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-end items-center ">
          <img src="/about.png" alt="" className=" h-[100%]" />
        </div>
      </div>
    </>
  );
};

export default AhlanPromo;

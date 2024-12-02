"use client";

import React from "react";
import Image from "next/image";
import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "./ui/button";
import AvatarGroup from "@atlaskit/avatar-group";
import { signIn } from "next-auth/react";

const data = [
  {
    key: "alice@example.com",
    name: "Alice Johnson",
    href: "#",
    src: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "bob@example.com",
    name: "Bob Smith",
    href: "#",
    src: "https://i.pravatar.cc/150?img=2",
  },
  {
    key: "carol@example.com",
    name: "Carol Davis",
    href: "#",
    src: "https://i.pravatar.cc/150?img=3",
  },
  {
    key: "dave@example.com",
    name: "Dave Williams",
    href: "#",
    src: "https://i.pravatar.cc/150?img=4",
  },
  {
    key: "eve@example.com",
    name: "Eve Taylor",
    href: "#",
    src: "https://i.pravatar.cc/150?img=5",
  },
  {
    key: "dave@example.com",
    name: "Dave Williams",
    href: "#",
    src: "https://i.pravatar.cc/150?img=6",
  },
  {
    key: "eve@example.com",
    name: "Eve Taylor",
    href: "#",
    src: "https://i.pravatar.cc/150?img=7",
  },
];

const Hero = () => {
  const [loading, setLoading] = React.useState(false);

  async function handleSignin() {
    try {
      setLoading(true);
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-[40rem] w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" flex flex-row justify-between  w-full px-16 absolute bottom-0 ">
        <div className=" p-4 z-10 pt-20 md:pt-0 flex flex-col items-start">
          <h1 className="text-4xl md:text-7xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 ">
            Payments Made <br />
            Simple, Right in
            <br /> Your Pocket.
          </h1>
          <p className="mt-4 font-normal text-base text-gray-200 max-w-sm  my-8">
            Now is not the time for you to be confused when making purchases
            online or making purchases abroad.
          </p>
          <div className=" flex gap-8">
            <Button
              className=" bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => handleSignin()}
            >
              Get Started
            </Button>
            <AvatarGroup
              appearance="stack"
              data={data}
              maxCount={5}
              label="Active Users"
            />
          </div>
        </div>

        <div className="mt-10 lg:mt-0">
          <Image
            src={"/hero.png"}
            width="600"
            className="w-full h-auto rounded-xl object-cover object-center"
            alt="Hero"
            height="400"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

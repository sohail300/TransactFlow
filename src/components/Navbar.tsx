"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log(session);

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

  function handleRedirectToTransactions() {
    if (session?.user.role === "Admin") {
      router.push("/admin/view-transactions");
    } else if (session?.user.role === "Manager") {
      router.push("/manager/view-transactions");
    } else if (session?.user.role === "Employee") {
      router.push("/employee/transactions");
    }

    // window.location.href = "/transactions";
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <nav className="bg-blue-700 p-4 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-blue-100 transition-colors"
        >
          TransactFlow
        </Link>
        <div>
          {session ? (
            <>
              <Button
                onClick={() => handleRedirectToTransactions()}
                className="bg-white text-blue-500 hover:bg-white focus:ring-4 focus:ring-blue-300 mr-4"
              >
                Transactions
              </Button>
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-white text-blue-500 hover:bg-white focus:ring-4 focus:ring-blue-300"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => handleSignin()}
              className="bg-white text-blue-500 hover:bg-white focus:ring-4 focus:ring-blue-300"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

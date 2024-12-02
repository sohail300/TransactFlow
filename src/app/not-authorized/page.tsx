import React from "react";
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotAuthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col items-center justify-center p-4 text-white">
      <Ban size={120} className="text-red-500 mb-8 animate-pulse" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Access Denied
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-center">
        You are not authorized to visit this page.
      </p>
      <div className="space-x-4">
        <Button
          variant="outline"
          className="bg-white text-blue-600 hover:bg-blue-100"
        >
          Go Back
        </Button>
        <Button className="bg-blue-700 hover:bg-blue-800">Home</Button>
      </div>
    </div>
  );
};

export default NotAuthorizedPage;

import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E1E1E] text-white py-3">
      <div className="container mx-auto text-center text-sm text-gray-200">
        &copy; {currentYear} BANK WALLET. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

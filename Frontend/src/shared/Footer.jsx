
   import React from "react";

  const Footer = () => {
    return (
      <div className="bg-gray-800  w-[120%]   ">
        <footer className=" text-white py-6 mt-11 max-w-7xl mx-auto">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            {/* Logo and Description */}
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h2 className="text-lg font-bold">JobPortal</h2>
              <p className="text-sm">
                Your gateway to top career opportunities.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col md:flex-row gap-4 text-center">
              <a href="/about" className="hover:text-blue-500">
                About Us
              </a>
              <a href="/jobs" className="hover:text-blue-500">
                Find Jobs
              </a>
              <a href="/contact" className="hover:text-blue-500">
                Contact Us
              </a>
              <a href="/privacy" className="hover:text-blue-500">
                Privacy Policy
              </a>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="https://facebook.com"
                className="hover:text-blue-500"
                aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-blue-500"
                aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://linkedin.com"
                className="hover:text-blue-500"
                aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="text-center mt-6 border-t border-gray-700 pt-4 text-sm">
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </div>
        </footer>
      </div>
    );
  };

  


export default Footer

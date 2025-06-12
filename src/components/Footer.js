import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-8 md:p-12 lg:p-16">
            <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between">
                {/* Logo */}
                <div className="mb-6 lg:mb-0 items-left text-left">
                    <img src="/logo.jpg" alt="Logo" className="h-12" />
                </div>

                {/* Navigation Links */}
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:space-x-10 text-left lg:text-center gap-4 items-center">
                    <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
                    <li><Link to="/about" className="hover:text-gray-400">About Us</Link></li>
                    <li><Link to="/services" className="hover:text-gray-400">Contact Us</Link></li>
                    <li><Link to="/blog" className="hover:text-gray-400">Staff Login</Link></li>
                    <li><Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link></li>
                    <li><Link to="/contact" className="hover:text-gray-400">Terms & Conditions</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;

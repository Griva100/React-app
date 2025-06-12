import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import "primeicons/primeicons.css";

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    // Function to close sidebar when clicking a link
    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    // Handle Logout
    const handleLogout = () => {
        dispatch(logoutUser());
        setSidebarOpen(false);
        navigate("/login");
    };

    return (
        <>
            <nav className="bg-white text-gray-900 p-4 w-full top-0 z-50 shadow-md">
                <div className="container mx-auto flex justify-between items-center h-full">
                    <div>
                        <img src="/logo.jpg" alt="Logo" className="h-10" />
                    </div>

                    {/* Navigation Links */}
                    <ul className="hidden md:flex space-x-6 items-center h-full">
                        <li className="h-full"><Link to="/" className="hover:text-gray-500">Home</Link></li>
                        <li className="h-full"><Link to="/marketplace" className="hover:text-gray-500">Marketplace</Link></li>
                        <li className="h-full"><Link to="/display" className="hover:text-gray-500">Display</Link></li>
                        <li className="relative group h-full">
                            <button className="flex items-center gap-1 hover:text-gray-500">
                                About <i className="pi pi-angle-down"></i>
                            </button>
                            <ul className="absolute left-0 top-full hidden group-hover:block w-48 bg-gray-100 text-gray-700 border border-gray-300 shadow-lg py-1 z-50">
                                <li className="hover:bg-gray-300 hover:rounded-md">
                                    <Link to="/contact" className="block px-4 py-2">Contact</Link>
                                </li>
                                <li className="hover:bg-gray-300 hover:rounded-md">
                                    <Link to="/about" className="block px-4 py-2">About Clax</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="h-full"><Link to="/Products" className="hover:text-gray-500">Products</Link></li>
                    </ul>
                    <div className="hidden md:flex space-x-4">
                        {user ? (
                            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500">
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100">Login</Link>
                                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Register</Link>
                            </>
                        )}
                    </div>
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <i className="pi pi-bars"></i>
                    </button>
                </div>
            </nav>
            {/* Sidebar Menu (For Mobile) */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-50`}>
                {/* Sidebar Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <img src="/logo.jpg" alt="Logo" className="h-10" />
                    <button onClick={() => setSidebarOpen(false)} className="text-2xl">
                        <i className="pi pi-times"></i>
                    </button>
                </div>

                {/* Sidebar Links */}
                <ul className="p-4">
                    <li className="py-2"><Link to="/" onClick={closeSidebar} className="hover:text-blue-500">Home</Link></li>
                    <li className="py-2"><Link to="/marketplace" onClick={closeSidebar} className="hover:text-blue-500">Marketplace</Link></li>
                    <li className="py-2"><Link to="/display" onClick={closeSidebar} className="hover:text-blue-500">Display</Link></li>

                    {/* Dropdown for About */}
                    <li className="py-2">
                        <button
                            onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                            className="flex justify-between w-full hover:text-gray-500"
                        >
                            About <i className={`pi pi-angle-${aboutDropdownOpen ? "up" : "down"}`}></i>
                        </button>
                        {aboutDropdownOpen && (
                            <ul className="mt-2 pl-4 text-gray-700 border-l">
                                <li className="py-1 hover:text-blue-500">
                                    <Link to="/contact" onClick={closeSidebar}>Contact</Link>
                                </li>
                                <li className="py-1 hover:text-blue-500">
                                    <Link to="/about" onClick={closeSidebar}>About Clax</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li className="py-2"><Link to="/products" onClick={closeSidebar} className="hover:text-blue-500">Products</Link></li>
                </ul>

                {/* Sidebar Auth Buttons */}
                <div className="p-4 border-t flex flex-col space-y-2">
                    {user ? (
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded text-center hover:bg-red-500">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" onClick={closeSidebar} className="px-4 py-2 border border-blue-600 text-blue-600 rounded text-center hover:bg-blue-100">Login</Link>
                            <Link to="/register" onClick={closeSidebar} className="px-4 py-2 bg-blue-600 text-white rounded text-center hover:bg-blue-500">Register</Link>
                        </>
                    )}
                </div>
            </div>

            {/* Background Overlay when Sidebar is Open */}
            {
                sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )
            }
        </>
    );
};

export default Navbar;

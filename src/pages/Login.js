import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import "primeicons/primeicons.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, status, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate Form
    const validateForm = () => {
        let newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
        // if (!formData.email.trim()) {
        //     newErrors.email = "Email is required";
        // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        //     newErrors.email = "Invalid email format";
        // } 
        if (!formData.password.trim()) newErrors.password = "Password is required";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const credentials = {
                password: formData.password,
                username: `${formData.firstName} ${formData.lastName}`
            };

            // dispatch(loginUser(credentials)).then((res) => {
            //     console.log("Full Response:", res);
            //     console.log("Payload:", res.payload);
            //     alert(res.payload.message);
            // });

            dispatch(loginUser(credentials));
            // if (status === "succeeded") {
            //     if (user.role === "ADMIN") {
            //         navigate("/profile");
            //     } else {
            //         navigate("/dashboard");
            //     }
            // } else {
            //     alert(error || "Invalid credentials!");
            // }
        }
    };

    useEffect(() => {
        // if (status === "succeeded" && user) {
        //     navigate("/");
        // }
        if (status === "succeeded" && user) {
            if (user.role === "CUSTOMER") {
                navigate("/profile");
            } else {
                navigate("/dashboard");
            }
        } else if (status === "failed") {
            alert(error || "Invalid credentials!");
            setFormData({
                firstName: "",
                lastName: "",
                password: ""
            });
        }
    }, [status, user, error, navigate]);

    return (
        <div className="flex h-screen">
            <div className="hidden md:flex w-1/2 items-center justify-center">
                <img src="/login-image.jpg" alt="Login" className="w-3/4 h-auto object-cover rounded-md shadow-lg" />
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-md p-8 rounded-lg">
                    <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                    <p className="text-gray-600 text-sm text-center mb-4">
                        By signing up, you agree to our
                    </p>
                    <p className="text-gray-600 text-sm text-center mb-4">
                        <Link to="/terms" className="font-bold text-blue-500">Terms of Use</Link> and
                        <Link to="/privacy" className="font-bold text-blue-500 ml-1">Privacy Policy</Link>
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* First Name & Last Name */}
                        <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-blue-500"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>
                            <div className="w-1/2">
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-blue-500"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Role Selection */}
                        {/* <div className="mb-4">
                            <label className="block text-gray-700">Select Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500">
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Customer">Customer</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                        </div> */}

                        {/* Email Input */}
                        {/* <div className="mb-4">
                            <label className="block text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-blue-500"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div> */}

                        {/* Password Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <div className="flex items-center border border-gray-300 rounded p-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full outline-none"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <i
                                    className={`pi ${showPassword ? "pi-eye-slash" : "pi-eye"} text-gray-600 cursor-pointer`}
                                    onClick={() => setShowPassword(!showPassword)}
                                ></i>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right text-blue-500 text-sm mb-4">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>

                        {/* Login Button */}
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500" disabled={status === "loading"}>
                            {status === "loading" ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="text-center text-gray-600 mt-4">
                        Create a New Account?
                        <Link to="/register" className="text-blue-500 font-semibold ml-1">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

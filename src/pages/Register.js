import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/authSlice";
import "primeicons/primeicons.css";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        role: "",
        mobile: "",
        email: "",
        password: "",
        otp: ["", "", "", "", "", ""],
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle OTP input
    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Allow only digits

        const newOtp = [...formData.otp];
        newOtp[index] = value;
        setFormData({ ...formData, otp: newOtp });

        // Move to next input field
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    // Handle backspace key navigation
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
        if (e.key === "ArrowLeft" && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
        if (e.key === "ArrowRight" && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    // Handle form validation
    const validateForm = () => {
        let newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
        if (!formData.role) newErrors.role = "Role selection is required";
        if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Enter a valid 10-digit Mobile Number";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.password.trim()) newErrors.password = "Password is required";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const { firstName, lastName, role, email, password, mobile } = formData;
            const userData = {
                email,
                password,
                role: role.toUpperCase(),
                username: `${firstName} ${lastName}`,
                mobile
            };
            console.log("userdata:", userData);

            // dispatch(registerUser(userData)).then((res) => {
            //     console.log("Full Response:", res);
            //     console.log("Payload:", res.payload);
            //     alert(res.payload.message);
            //     if (res.payload && res.meta.requestStatus === "fulfilled") {
            //         navigate("/login");
            //     } else {
            //         console.error("Registration failed:", res.payload);
            //     }
            // });
            dispatch(registerUser(userData));
            alert("Registration Successful!");
            navigate("/login");
        }
    };

    return (
        <div className="flex">
            <div className="hidden md:flex w-1/2 items-center justify-center">
                <img src="/login-image.jpg" alt="Register" className="w-3/4 h-auto object-cover rounded-md shadow-lg" />
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-md p-8 rounded-lg">
                    <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

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
                        <div className="mb-4">
                            <label className="block text-gray-700">Select Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
                                <option value="">Select Role</option>
                                <option value="Admin">ADMIN</option>
                                <option value="Customer">CUSTOMER</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                        </div>

                        {/* Mobile Number */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Mobile Number</label>
                            <input
                                type="text"
                                name="mobile"
                                placeholder="Enter Mobile Number"
                                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-blue-500"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                        </div>

                        {/* Email with Send OTP Button */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Email Address</label>
                            <div className="flex items-center border border-gray-300 rounded p-1">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    className="w-full outline-none p-2"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <button className="ml-2 px-2 py-1 border border-blue-600 text-blue-600 rounded rounded hover:bg-blue-100 text-xs">
                                    Send OTP
                                </button>
                            </div>
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

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

                        {/* OTP Input Boxes */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Enter OTP</label>
                            <div className="flex justify-between gap-2 mt-1">
                                {formData.otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-blue-500"
                                    />
                                ))}
                            </div>
                            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500" disabled={status === "loading"}>    {status === "loading" ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-4">
                        Already have an account?
                        <Link to="/login" className="text-blue-500 font-semibold ml-1">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

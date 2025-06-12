import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section
            className="relative h-[70vh] bg-center flex items-center z-10"
        >
            <img
                src="/hero-bg.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="container relative z-20 ml-auto px-6">
                <div className="max-w-lg">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Welcome to Our Platform
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 mb-6 leading-relaxed">
                        Discover amazing opportunities and grow with us. Lorem ipsum dolor sit amet. Aut exercitationem galisum eum voluptatum officiis rem sunt eveniet et enim officiis aut repudiandae laudantium est laudantium galisum. At sunt nesciunt aut optio commodi ut dolor vitae aut nihil galisum et magnam iusto quo facilis sunt nam consequatur ullam.
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 transition text-sm sm:text-base"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;

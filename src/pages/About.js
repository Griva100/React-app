import React from "react";

const About = () => {
    return (
        <section className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center my-20">
            <div className="w-full md:w-1/2 flex justify-center">
                <img
                    src="/about-image.jpg"
                    alt="About Us"
                    className="w-full max-w-sm md:max-w-full h-auto rounded-lg"
                />
            </div>

            <div className="w-full md:w-1/2 md:pl-12 mt-6 md:mt-0 text-center md:text-left">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    About Our Platform
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Lorem ipsum dolor sit amet. Aut exercitationem galisum eum voluptatum officiis rem sunt eveniet et enim officiis aut repudiandae laudantium est laudantium galisum. At sunt nesciunt aut optio commodi ut dolor vitae aut nihil galisum et magnam iusto quo facilis sunt nam consequatur ullam.
                </p>
            </div>
        </section>
    );
};

export default About;

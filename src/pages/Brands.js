import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Brand = () => {
    const brands = [
        { img: "/brand1.png", name: "Brand One" },
        { img: "/brand2.png", name: "Brand Two" },
        { img: "/brand3.png", name: "Brand Three" },
        { img: "/brand4.png", name: "Brand Four" },
        { img: "/brand5.png", name: "Brand Five" },
        { img: "/brand6.png", name: "Brand Six" },
    ];

    return (
        <section className="container mx-auto px-6 py-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-16">Our Trusted Brands</h2>

            {/* Swiper Slider */}
            <Swiper
                modules={[Navigation]}
                slidesPerView={3}
                spaceBetween={30}
                navigation
                loop = {true}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 3 },
                }}
                className="relative w-full"
            >
                {brands.map((brand, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-gray-100 p-6 rounded-xl flex flex-col items-center justify-center h-100">
                            <img
                                src={brand.img}
                                alt={`Brand ${index + 1}`}
                                className="w-40 h-40 object-contain m-8 mb-16"
                            />
                            <p className="text-m font-semibold">{brand.name}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Brand;

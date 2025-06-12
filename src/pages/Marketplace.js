import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import { Grid, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Calendar } from "primereact/calendar";

const advisors = [
    { id: 1, name: "Shahzub Shaikh1", img: "/advisor1.jpg", times: [{ id: 1, time: "09:00", status: "available" }, { id: 2, time: "09:00", status: "selected" }, { id: 3, time: "09:00", status: "disabled" }] },
    { id: 2, name: "Shahzub Shaikh2", img: "/advisor1.jpg", times: [{ id: 1, time: "09:00", status: "available" }, { id: 2, time: "09:00", status: "available" }, { id: 3, time: "09:00", status: "available" }] },
    { id: 3, name: "Shahzub Shaikh3", img: "/advisor1.jpg", times: [{ id: 1, time: "09:00", status: "disabled" }, { id: 2, time: "09:00", status: "disabled" }, { id: 3, time: "09:00", status: "disabled" }] },
    { id: 4, name: "Shahzub Shaikh4", img: "/advisor1.jpg", times: [{ id: 1, time: "09:00", status: "available" }, { id: 2, time: "09:00", status: "disabled" }, { id: 3, time: "09:00", status: "disabled" }] },
    { id: 5, name: "Shahzub Shaikh5", img: "/advisor1.jpg", times: [{ id: 1, time: "09:00", status: "disabled" }, { id: 2, time: "09:00", status: "available" }, { id: 3, time: "09:00", status: "disabled" }] },
    { id: 6, name: "Shahzub Shaikh6", img: "/advisor1.jpg", times: [{ id: 1, time: "09:00", status: "available" }, { id: 2, time: "09:00", status: "disabled" }, { id: 3, time: "09:00", status: "available" }] },
];

const Marketplace = () => {
    const [mainImage, setMainImage] = useState("/Car1.jpg");
    const [thumbnails, setThumbnails] = useState(["/Car2.jpg", "/Car3.jpg", "/Car4.jpg", "/Car5.jpg"]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedAdvisor, setSelectedAdvisor] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentAdvisorIndex, setCurrentAdvisorIndex] = useState(0);

    const swapImage = (clickedIndex) => {
        const newThumbnails = [...thumbnails];
        const clickedImage = newThumbnails[clickedIndex];

        newThumbnails[clickedIndex] = mainImage;
        setMainImage(clickedImage);
        setThumbnails(newThumbnails);
    };

    const addComment = () => {
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment("");
        }
    };

    const services = [
        { id: 1, name: "Periodic Service", icon: "pi pi-wrench" },
        { id: 2, name: "AC Service & Repair", icon: "pi pi-cog" },
        { id: 3, name: "Batteries", icon: "pi pi-bolt" },
        { id: 4, name: "Tyres & Wheel Care", icon: "pi pi-circle" },
        { id: 5, name: "Car Wash", icon: "pi pi-car" },
    ];

    const repeatedServices = [...services, ...services];

    const checkBoxServices = [
        { id: 1, name: "Service 1" },
        { id: 2, name: "Service 2" },
        { id: 3, name: "Service 3" },
        { id: 4, name: "Service 4" },
        { id: 5, name: "Service 5" },
    ];

    const toggleService = (serviceId) => {
        setSelectedServices((prev) =>
            prev.includes(serviceId)
                ? prev.filter((id) => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const [formData, setFormData] = useState({
        vin: "",
        make: "",
        model: "",
        manufactureYear: "",
        licensePlate: "",
        licenseDate: null,
        motorType: "",
        transmission: "",
        motorCode: "",
        fleet: "",
        color: "",
        odometer: "",
        warrantyFrom: null,
        warrantyTo: null,
    });

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleDateChange = (e, field) => {
        setFormData({ ...formData, [field]: e.value });
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col">
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-700 mb-2 md:mb-3">Complete Booking</h1>
            <div className="bg-white shadow-lg rounded-lg p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 w-full h-full">
                <div className="w-full lg:w-3/5 flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-3/5 items-center">
                        <img
                            src={mainImage}
                            alt="Main Car"
                            className="w-full h-full rounded-lg"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 w-full md:w-2/5">
                        {thumbnails.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                className="rounded-lg w-full h-full cursor-pointer hover:opacity-75 transition-all"
                                alt={`Car ${index + 2}`}
                                onClick={() => swapImage(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-2/5 flex flex-col justify-center gap-2 md:gap-3 lg:gap-4">
                    <div className="flex items-center gap-1 md:gap-2 text-base md:text-lg lg:text-xl">
                        <i className="pi pi-star-fill text-yellow-400"></i> <span>4.5</span>
                    </div>
                    <p className="text-gray-600 text-base md:text-lg lg:text-xl">Andheri East</p>
                    <h2 className="text-blue-600 font-bold text-lg md:text-xl lg:text-2xl">Dealer Name</h2>
                    <p className="text-gray-500 text-sm md:text-base lg:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    <button className="mt-3 px-2 py-2 text-black rounded-lg flex items-center gap-2 border-2 w-fit text-base md:text-lg lg:text-xl">
                        <i className="pi pi-directions text-red-500"></i> Direction
                    </button>
                </div>
            </div>

            <div className="w-full py-5 md:py-6 lg:py-8">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-5">Select Services</h2>

                <div className="flex flex-col lg:flex-row w-full gap-4 md:gap-6 lg:gap-10">
                    <div className="w-full lg:w-3/5 relative">
                        <Swiper
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                            spaceBetween={20}
                            grid={{ rows: 2, fill: "row" }}
                            navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
                            loop={true}
                            modules={[Grid, Navigation]}
                            className="w-full"
                        >
                            {repeatedServices.map((service, index) => (
                                <SwiperSlide key={`${service.id}-${index}`} className="flex flex-col items-center">
                                    <div
                                        className={`py-10 lg:py-12 border rounded-lg flex flex-col items-center justify-center
                                    ${selectedServices.includes(service.id) ? "bg-blue-500 text-white" : "bg-white"}`}
                                    >
                                        <i className={`${service.icon} text-4xl `}></i>
                                    </div>
                                    <p className="text-center text-xs md:text-sm lg:text-base mt-1 break-words items-center justify-center">{service.name}</p>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button className="prev-btn absolute left-[-20px] md:left-[-30px] top-[46%] transform -translate-y-1/2 p-1 md:p-2 rounded-full shadow">
                            <i className="pi pi-chevron-left text-sm"></i>
                        </button>
                        <button className="next-btn absolute right-[-20px] md:right-[-30px] top-[46%] transform -translate-y-1/2 p-1 md:p-2 rounded-full shadow">
                            <i className="pi pi-chevron-right text-sm"></i>
                        </button>
                    </div>

                    <div className="w-full lg:w-2/5 bg-white p-6 rounded-lg shadow-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-4 md:gap-6">
                                {checkBoxServices.map((service) => (
                                    <label key={service.id} className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 lg:w-6 lg:h-6 accent-green-500"
                                            checked={selectedServices.includes(service.id)}
                                            onChange={() => toggleService(service.id)}
                                        />
                                        <p className="text-sm md:text-base lg:text-lg text-gray-700">{service.name}</p>
                                    </label>
                                ))}
                            </div>
                            <div className="flex flex-col gap-4 md:gap-6">
                                {checkBoxServices.map((service) => (
                                    <label key={`duplicate-${service.id}`} className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 lg:w-6 lg:h-6 accent-green-500"
                                            checked={selectedServices.includes(service.id)}
                                            onChange={() => toggleService(service.id)}
                                        />
                                        <p className="text-sm md:text-base lg:text-lg text-gray-700">{service.name}</p>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full mx-auto bg-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-lg shadow-lg mt-0 md:mt-4">
                <h2 className="bg-blue-600 text-white px-4 py-2 inline-block text-sm rounded-t-lg">
                    Add Comment
                </h2>
                <hr className="border-t-2 border-blue-600 mb-4" />
                <div className="rounded-lg min-h-[150px] mt-4">
                    {comments.length === 0 ? (
                        <p className="text-gray-500 text-sm md:text-base">There are no comments.</p>
                    ) : (
                        comments.map((cmt, index) => (
                            <div key={index} className="p-2 border-b last:border-none text-sm md:text-base">
                                {cmt}
                            </div>
                        ))
                    )}
                </div>

                <div className="flex items-center gap-2 border mt-4 rounded-lg bg-gray-100">
                    <InputText
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment..."
                        className="flex-1 p-2 border-none bg-transparent text-sm md:text-base"
                    />
                    <button className="p-2">
                        <i className="pi pi-microphone text-yellow-500 text-lg"></i>
                    </button>
                    <button
                        className="p-2 pr-8"
                        onClick={addComment}
                    >
                        <i className="pi pi-send text-gray-600 text-md"></i>
                    </button>
                </div>
            </div>

            <div className="p-5 sm:p-6 md:p-7 lg:p-8 bg-white mx-auto mt-6 md:mt-10 rounded-lg shadow-lg w-full flex flex-col lg:flex-row gap-4 lg:gap-8">
                <div className="w-full lg:w-[49%]">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 mb-2">Preferred Service Date</h2>
                    <Calendar
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.value)}
                        inline
                        className="w-full shadow-md rounded-lg"
                    />
                </div>

                <div className="w-full lg:w-[49%]">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700">Preferred Advisor</h2>
                        <div className="flex gap-2 relative">
                            <button className="prev-btn p-2 text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed" disabled={currentAdvisorIndex === 0}
                            >
                                <i className="pi pi-chevron-left text-base"></i>
                            </button>
                            <button className="next-btn p-2 text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed" disabled={currentAdvisorIndex >= advisors.length - 4}
                            >
                                <i className="pi pi-chevron-right text-base"></i>
                            </button>
                        </div>
                    </div>

                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={1}
                        spaceBetween={10}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: {
                                slidesPerView: 4, spaceBetween: 15
                            },
                        }}
                        navigation={{
                            nextEl: ".next-btn", prevEl: ".prev-btn"
                        }}
                        className="w-full"
                        onSlideChange={(swiper) => setCurrentAdvisorIndex(swiper.currentAdvisorIndex)}
                    >
                        {advisors.map((advisor) => (
                            <SwiperSlide key={advisor.id}>
                                <div
                                    className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedAdvisor === advisor.id ? "bg-blue-500" : "shadow-sm"
                                        }`}
                                    onClick={() => setSelectedAdvisor(advisor.id)}
                                >
                                    <img src={advisor.img} alt={advisor.name} className=" w-12 h-12 xl:w-16 xl:h-16 rounded-full mb-4" />
                                    <p className={`text-xs xl:text-sm font-medium text-center ${selectedAdvisor === advisor.id ? "text-white" : "text-blue-500"}`}>{advisor.name}</p>

                                    <button className="mt-4 px-3 py-2 rounded text-xs sm:text-sm border bg-white border-blue-500 text-blue-500">
                                        {selectedAdvisor === advisor.id ? "Selected" : "Select"}
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 my-3">Preferred Service Time</h2>

                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={1}
                        spaceBetween={10}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4, spaceBetween: 15 },
                        }}
                        navigation={{
                            nextEl: ".next-btn", prevEl: ".prev-btn"
                        }}
                        className="w-full"
                    >
                        {advisors.map((advisor) => (
                            <SwiperSlide key={advisor.id}>
                                <div className="md:grid flex gap-4">
                                    {advisor.times.map((slot) => (
                                        <button
                                            key={slot.id}
                                            className={`px-3 py-2 w-full rounded-md text-xs sm:text-sm font-medium ${slot.status === "available"
                                                ? "bg-green-100 hover:bg-green-200"
                                                : slot.status === "selected"
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                }`}
                                            disabled={slot.status === "disabled"}
                                            onClick={() => setSelectedTime(slot.id)}
                                        >
                                            {slot.time}
                                        </button>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div >

            <div className="p-5 sm:p-6 md:p-7 lg:p-8 mt-10 bg-white rounded-lg shadow-lg">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-blue-500 mb-4">Vehicle Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-600 mb-1 text-sm md:text-base lg:text-lg">Vehicle Identification Number (VIN)</label>
                        <InputText
                            value={formData.vin}
                            onChange={(e) => handleChange(e, "vin")}
                            placeholder="e.g. 1HGCM82633A123456"
                            className="w-full p-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-400 placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1 text-sm md:text-base lg:text-lg">Vehicle Make</label>
                        <InputText
                            value={formData.make}
                            onChange={(e) => handleChange(e, "make")}
                            placeholder="e.g. Toyota, Ford, Honda"
                            className="w-full p-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-400 placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1 text-sm md:text-base lg:text-lg">Vehicle Model</label>
                        <InputText
                            value={formData.model}
                            onChange={(e) => handleChange(e, "model")}
                            placeholder="e.g. Camry, F-150, Civic"
                            className="w-full p-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-400 placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1 text-sm md:text-base lg:text-lg">Year of Manufacture</label>
                        <InputText
                            value={formData.manufactureYear}
                            onChange={(e) => handleChange(e, "manufactureYear")}
                            placeholder="e.g. 2022"
                            className="w-full p-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-400 placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1 text-sm md:text-base lg:text-lg">License Plate Number</label>
                        <InputText
                            value={formData.licensePlate}
                            onChange={(e) => handleChange(e, "licensePlate")}
                            placeholder="e.g. ABC 1234"
                            className="w-full p-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-400 placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1 text-sm md:text-base lg:text-lg">License Plate Date</label>
                        <Calendar
                            value={formData.licenseDate}
                            onChange={(e) => handleDateChange(e, "licenseDate")}
                            placeholder="00-00-0000"
                            className="w-full p-2 border rounded-md border-gray-400 focus:outline-none placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                            showIcon
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1 text-sm md:text-base lg:text-lg">Motor Type</label>
                        <InputText
                            value={formData.motorType}
                            onChange={(e) => handleChange(e, "motorType")}
                            placeholder="e.g. V6, 2.0L Turbo"
                            className="w-full p-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-400 placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1 text-sm md:text-base lg:text-lg">Transmission Type</label>
                        <InputText
                            value={formData.transmission}
                            onChange={(e) => handleChange(e, "transmission")}
                            placeholder="e.g. Automatic, Manual"
                            className="w-full p-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-400 placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1 text-sm md:text-base lg:text-lg">Motor Code</label>
                        <InputText
                            value={formData.motorCode}
                            onChange={(e) => handleChange(e, "motorCode")}
                            placeholder="e.g. B16A"
                            className="w-full p-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-400 placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1 text-sm md:text-base lg:text-lg">Fleet</label>
                        <InputText
                            value={formData.fleet}
                            onChange={(e) => handleChange(e, "fleet")}
                            placeholder="e.g. Dealer"
                            className="w-full p-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-400 placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1 text-sm md:text-base lg:text-lg">Color</label>
                        <InputText
                            value={formData.color}
                            onChange={(e) => handleChange(e, "color")}
                            placeholder="e.g. Red"
                            className="w-full p-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-400 placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1 text-sm md:text-base lg:text-lg">Odometer</label>
                        <InputText
                            value={formData.odometer}
                            onChange={(e) => handleChange(e, "odometer")}
                            placeholder="e.g. Mechanical, Digital"
                            className="w-full p-2 border rounded-md border-gray-400 focus:outline-none focus:border-blue-400 placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1 text-sm md:text-base lg:text-lg">Warranty</label>
                        <div className="flex items-center gap-4">
                            <Calendar
                                value={formData.warrantyFrom}
                                onChange={(e) => handleDateChange(e, "warrantyFrom")}
                                placeholder="00-00-0000"
                                className="w-full p-2 border rounded-md border-gray-400 focus:outline-none focus:ring-0 placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                                showIcon
                            />
                            <span className="text-gray-500">to</span>
                            <Calendar
                                value={formData.warrantyTo}
                                onChange={(e) => handleDateChange(e, "warrantyTo")}
                                placeholder="00-00-0000"
                                className="w-full p-2 border rounded-md border-gray-400 focus:outline-none placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
                                showIcon
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-6 gap-4">
                    <button className="px-4 py-3 sm:py-2 w-full sm:w-auto text-base md:text-lg lg:text-xl bg-gray-300 text-black rounded-md hover:bg-gray-400 transition">Cancel</button>
                    <button className="px-4 py-3 sm:py-2 w-full sm:w-auto text-base md:text-lg lg:text-xl bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Book Appointment</button>
                </div>
            </div>
        </div >
    );
};

export default Marketplace;
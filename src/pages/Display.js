import React, { useState, useRef, useEffect } from "react";

const Display = () => {
    const [viewMode, setViewMode] = useState("list"); // Default is List View
    const [selectedItem, setSelectedItem] = useState(null);
    const selectedRef = useRef(null);

    const data = [
        { id: 1, title: "Item 1", description: "This is a description for item 1. Lorem ipsum dolor sit amet. Qui pariatur deleniti eos quia fugit ad molestiae accusantium ut suscipit laboriosam qui dolor porro et nihil distinctio qui impedit tempore. Aut vitae esse ea quia inventore est aliquid quibusdam sed ipsum velit nam exercitationem debitis vel harum doloremque aut adipisci porro. Aut sunt velit rem quae voluptatem est adipisci maxime eos unde vitae nam internos possimus? Non aspernatur veritatis in totam corporis At sunt nisi.", img: "/brand1.png" },
        { id: 2, title: "Item 2", description: "This is a description for item 2. Est assumenda mollitia et nulla error non accusamus esse ut possimus accusantium hic alias blanditiis vel pariatur tempora. Aut quisquam commodi ab labore quas est commodi earum.", img: "/brand2.png" },
        { id: 3, title: "Item 3", description: "This is a description for item 3. Sit nemo rerum et deleniti molestias aut illo Quis sit molestiae possimus aut temporibus facere est sint nostrum est quam sint. Sed repellendus provident eos explicabo animi aut incidunt cumque ea dolores nesciunt vel quia voluptas.", img: "/brand3.png" },
        { id: 4, title: "Item 4", description: "This is a description for item 4. Note that description not bigger than 100 words. Rem expedita ipsum qui similique exercitationem rem magnam mollitia sed quia dicta est mollitia veritatis eos molestiae accusamus. At voluptas inventore in sint fuga in voluptates corporis ea voluptates commodi qui deleniti aliquam aut quod excepturi! Est unde molestiae aut ipsa blanditiis et tempora tenetur.", img: "/brand4.png" },
    ];

    // Auto-scroll into view when selected item changes
    useEffect(() => {
        if (selectedItem && selectedRef.current) {
            selectedRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [selectedItem]);

    return (
        <div className="container mx-auto p-4">
            {/* Toggle Buttons */}
            <div className="flex justify-end mb-4">
                <button
                    className={`px-4 py-2 mr-2 border rounded-md transition-all duration-300 ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                    onClick={() => setViewMode("list")}
                >
                    List View
                </button>
                <button
                    className={`px-4 py-2 border rounded-md transition-all duration-300 ${viewMode === "card" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                    onClick={() => setViewMode("card")}
                >
                    Card View
                </button>
            </div>

            {/* Display Data */}
            <div className="flex justify-around">
                {viewMode === "list" ? (
                    <div className="space-y-4">
                        {data.map((item) => (
                            <div key={item.id} className={`flex items-center p-4 border rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 ${selectedItem?.id === item.id ? "border-blue-500" : ""}`}
                                onClick={() => setSelectedItem(item)}>
                                <div className="w-24 h-24 flex-shrink-0">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((item) => (
                            <div key={item.id} className={`p-4 border rounded-lg shadow-lg bg-white flex flex-col items-center cursor-pointer hover:bg-gray-100 ${selectedItem?.id === item.id ? "border-blue-500" : ""}`}
                                onClick={() => setSelectedItem(item)}
                            >
                                <div className="w-40 h-40 flex items-center justify-center mb-4">
                                    <img src={item.img} alt={item.title} className="w-full h-full rounded-xl mb-2" />
                                </div>
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Selected Item Display */}
            {selectedItem && (
                <div ref={selectedRef} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-blue-600">{selectedItem.title}</h2>
                    <p className="text-gray-700 text-base">{selectedItem.description}</p>
                </div>
            )}
        </div>
    );
};

export default Display;
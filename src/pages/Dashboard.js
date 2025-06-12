import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [option, setOption] = useState("Action");
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [description, setDescription] = useState("");

    const [graphs, setGraphs] = useState([]);
    const [actions, setActions] = useState([]);
    const [summaries, setSummaries] = useState([]);
    const [uploaded, setUploaded] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleImageUpload = (file) => {
        setImageFile(file);
        setUploaded(true);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            handleImageUpload(file);
        }
    };
    const handleSubmit = () => {
        if (!title.trim()) return;

        if (option === "Graph" && url.trim()) {
            setGraphs([...graphs, { title, url }]);
        } else if (option === "Action" && imageFile) {
            setActions([...actions, { title, image: URL.createObjectURL(imageFile) }]);
        } else if (option === "Summary" && imageFile && description.trim()) {
            setSummaries([...summaries, { title, image: URL.createObjectURL(imageFile), description }]);
        }

        setTitle("");
        setUrl("");
        setImageFile(null);
        setDescription("");
        setUploaded(false);
        setSidebarOpen(false);
    };

    return (
        <div className="min-h-screen flex bg-gray-100 p-6">
            <div className="w-full bg-white shadow-lg rounded-lg p-6 relative">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <button className="p-2 bg-gray-800 text-white rounded shadow-md flex items-center justify-center" onClick={() => setSidebarOpen(true)}>
                        <i className="pi pi-cog text-lg"></i>
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Action Cards */}
                    {actions.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {actions.map((action, index) => (
                                <div key={index} className="p-4 bg-white shadow-md rounded flex flex-col items-center">
                                    <div className="w-[200px] h-[250px] flex items-center justify-center bg-gray-200 rounded">
                                        <img src={action.image} alt={action.title} className="w-full h-full object-contain" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-center mt-2">{action.title}</h3>
                                    <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded" onClick={() => navigate("/about")}>
                                        Go to About
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Summary Cards */}
                    {summaries.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {summaries.map((summary, index) => (
                                <div key={index} className="p-4 bg-white shadow-lg rounded flex flex-col items-center">
                                    <div className="w-[200px] h-[250px] flex items-center justify-center bg-gray-200 rounded">
                                        <img src={summary.image} alt={summary.title} className="w-full h-full object-contain" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-center mt-2">{summary.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1 text-center line-clamp-3">{summary.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Graphs */}
                    {graphs.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {graphs.map((graph, index) => (
                                <div key={index} className="border border-gray-300 rounded-md w-full">
                                    <h3 className="text-lg font-semibold text-center mt-2">{graph.title}</h3>
                                    <iframe src={graph.url} title={graph.title} className="w-full h-[400px]"></iframe>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar */}
            {sidebarOpen && (
                <>
                    <div className="fixed inset-0 bg-gray-500 opacity-80 z-10" onClick={() => setSidebarOpen(false)}></div>

                    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-20 flex flex-col">
                        <div className="bg-blue-600 text-white flex justify-between items-center p-4">
                            <h2 className="text-xl font-semibold">Settings</h2>
                            <button className="text-white rounded" onClick={() => setSidebarOpen(false)}>
                                <i className="pi pi-times"></i>
                            </button>
                        </div>

                        <div className="p-4 flex-1 overflow-auto">
                            <label className="block text-gray-700 mb-1">Select Option</label>
                            <select className="w-full p-2 mb-4 bg-gray-100 text-black rounded" value={option} onChange={(e) => setOption(e.target.value)}>
                                <option value="Action">Action</option>
                                <option value="Summary">Summary</option>
                                <option value="Graph">Graph</option>
                            </select>

                            <label className="block text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                placeholder="Enter Title"
                                className="w-full p-2 mb-2 bg-gray-100 text-black rounded"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            {option === "Graph" && (
                                <>
                                    <label className="block text-gray-700 mb-1">Graph URL</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Graph URL"
                                        className="w-full p-2 mb-2 bg-gray-100 text-black rounded"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </>
                            )}

                            {option === "Summary" && (
                                <>
                                    <label className="block text-gray-700 mb-1">Description</label>
                                    <textarea
                                        placeholder="Enter Description"
                                        className="w-full p-2 mb-2 bg-gray-100 text-black rounded"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </>
                            )}

                            {(option === "Action" || option === "Summary") && (
                                <>
                                    <label className="block text-gray-700 mb-1">Upload Image</label>
                                    <div
                                        className="w-full p-10 border-2 border-dashed border-gray-400 text-gray-600 rounded mb-2 flex flex-col items-center justify-center cursor-pointer bg-gray-100"
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        onClick={() => document.getElementById("fileInput").click()}
                                    >
                                        {uploaded ? (
                                            <p className="text-green-600 text-sm">Done, uploaded!</p>
                                        ) : (
                                            <p className="text-gray-600 text-sm">
                                                Drag here or <span className="text-blue-500 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent parent click event
                                                        document.getElementById("fileInput").click();
                                                    }}>click here to upload</span>
                                            </p>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="fileInput"
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(e.target.files[0])}
                                    />
                                </>
                            )}

                            <button className="w-full bg-blue-500 hover:bg-blue-700 p-2 rounded text-white mt-4" onClick={handleSubmit}>
                                Add {option}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
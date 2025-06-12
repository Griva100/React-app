import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../redux/authSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        role: user?.role || "",
        mobile: user?.mobile || "",
    });

    if (!user) return <h2>No User Data Available</h2>;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        dispatch(updateUser(formData));
        setEditable(false);
    };

    const handleCancel = () => {
        setFormData({
            username: user?.username || "",
            email: user?.email || "",
            role: user?.role || "",
            mobile: user?.mobile || "",
        });
        setEditable(false);
    };

    return (
        <div className="items-center min-h-screen">
            <div className="bg-white p-6 max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg text-center mt-10">
                <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>

                <div className="mb-4 text-left">
                    <label className="block text-gray-600">Name:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={!editable}
                        className={`w-full p-2 border ${editable ? "border-blue-500" : "border-gray-300"} rounded`}
                    />
                </div>

                <div className="mb-4 text-left">
                    <label className="block text-gray-600">Mobile Number:</label>
                    <input
                        type="number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        disabled={!editable}
                        className={`w-full p-2 border ${editable ? "border-blue-500" : "border-gray-300"} rounded`}
                    />
                </div>

                <div className="mb-4 text-left">
                    <label className="block text-gray-600">Email Address:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!editable}
                        className={`w-full p-2 border ${editable ? "border-blue-500" : "border-gray-300"} rounded`}
                    />
                </div>

                <div className="mb-4 text-left">
                    <label className="block text-gray-600">Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        disabled={!editable}
                        className={`w-full p-2 border ${editable ? "border-blue-500" : "border-gray-300"} rounded`}
                    />
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    {editable ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditable(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;

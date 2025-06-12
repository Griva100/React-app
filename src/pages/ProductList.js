import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct } from "../redux/productSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const ProductList = () => {
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Filter products based on search input
    const filteredProducts = items.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Image template
    const imageTemplate = (rowData) => (
        <img src={rowData.thumbnail} alt={rowData.title} className="w-16 h-16 rounded-md" onError={(e) => {
            e.target.onerror = null;
        }} />
    );

    // View product details in modal
    const handleView = (product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    // Edit product details in sidebar
    const handleEdit = (product) => {
        setEditData(product);
        setIsSidebarVisible(true);
    };

    // Update product in Redux store
    const handleUpdate = () => {
        dispatch(updateProduct(editData));
        setIsSidebarVisible(false);
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-4 text-center">Product List</h1>

            {/* Search Bar */}
            <div className="mb-4">
                <InputText
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Title"
                    className="p-2 border rounded-md w-full"
                />
            </div>

            {/* Product Table */}
            {status === "loading" && <p>Loading products...</p>}
            {status === "failed" && <p>Error fetching products.</p>}
            {status === "succeeded" && (
                <DataTable value={filteredProducts} className="p-4 bg-gray-200">
                    <Column field="id" header="ID" />
                    <Column field="title" header="Title" />
                    <Column body={imageTemplate} header="Image" />
                    <Column field="category" header="Category" />
                    <Column field="price" header="Price ($)" />
                    <Column
                        header="Actions"
                        body={(rowData) => (
                            <div className="flex gap-2">
                                <Button label="View" onClick={() => handleView(rowData)} />
                                <Button label="Edit" onClick={() => handleEdit(rowData)} className="p-button-warning" />
                            </div>
                        )}
                    />
                </DataTable>
            )}

            {/* View Product Modal */}
            <Dialog
                visible={isModalVisible}
                onHide={() => setIsModalVisible(false)}
                header="Product Details"
                style={{ width: "40vw" }}
            >
                {selectedProduct && (
                    <div className="space-y-2">
                        <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="w-32 h-32 rounded-md" />
                        <p><strong>Title:</strong> {selectedProduct.title}</p>
                        <p><strong>Category:</strong> {selectedProduct.category}</p>
                        <p><strong>Price:</strong> ${selectedProduct.price}</p>
                    </div>
                )}
            </Dialog>

            {/* Edit Product Sidebar */}
            <Sidebar visible={isSidebarVisible} onHide={() => setIsSidebarVisible(false)} position="right">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Edit Product</h2>
                {editData && (
                    <div className="space-y-4">
                        <div>
                            <label className="font-semibold text-gray-600">Product Image</label>
                            <div className="relative w-32 h-32 mt-2">
                                <img
                                    src={editData.thumbnail}
                                    alt="Product"
                                    className="w-full h-full object-cover rounded-md shadow-md"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const imageUrl = URL.createObjectURL(file);
                                            setEditData({ ...editData, thumbnail: imageUrl });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-semibold text-gray-600">Title</label>
                            <InputText value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className="p-2 border rounded-md w-full" />
                        </div>

                        <div>
                            <label className="font-semibold text-gray-600">Category</label>
                            <InputText value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} className="p-2 border rounded-md w-full" />
                        </div>

                        <div>
                            <label className="font-semibold text-gray-600">Price ($)</label>
                            <InputText value={editData.price} type="number" onChange={(e) => setEditData({ ...editData, price: e.target.value })} className="p-2 border rounded-md w-full" />
                        </div>

                        <Button label="Update" onClick={handleUpdate} className="p-2 bg-gray-400 w-full text-black" />
                    </div>
                )}
            </Sidebar>
        </div>
    );
};

export default ProductList;
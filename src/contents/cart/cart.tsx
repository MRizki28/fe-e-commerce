'use client';

import { useState } from "react";

interface CartProps {
    isOpen: boolean; 
    onClose: () => void; 
}

export default function Cart({ isOpen, onClose }: CartProps) {
    const [quantity, setQuantity] = useState(0);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-full">
                <div className="border-b p-4">
                    <h3 className="font-bold text-lg">Shopping Cart</h3>
                </div>
                <div className="cart-body p-4">
                    <div className="relative overflow-x-auto max-h-80 shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-16 py-3">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">
                                        <img src="#" className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        Product Name
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white flex items-center">
                                        <button onClick={decreaseQuantity} className="bg-gray-200 p-1 rounded-md hover:bg-gray-300">-</button>
                                        <span className="mx-2">{quantity}</span>
                                        <button onClick={increaseQuantity} className="bg-gray-200 p-1 rounded-md hover:bg-gray-300">+</button>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        2000
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="border rounded-lg mt-4">
                        <div className="info-header p-3">
                            <h3 className="font-bold text-lg mb-3">Order Summary</h3>
                        </div>
                        <div className="p-3">
                            <dl className="flex justify-between font-bold">
                                <dt>Total</dt>
                                <dd>{quantity * 2000}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex justify-end">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

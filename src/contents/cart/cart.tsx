'use client';

import SweetAlertService from "@/helper/sweetAlert";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const [dataCart, setDataCart] = useState<any[]>([]);
    const [deleteLoading, setDeleteLoading] = useState<{ [key: string]: boolean }>({});
    const [loading, setLoading] = useState(true);

    const getDataCart = async () => {
        setLoading(true); // Set loading ke true sebelum memulai pengambilan data
        try {
            const response = await axios.get('https://beecommers.up.railway.app/api/v1/cart', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const responseData = response.data;
            console.log(responseData);
            setDataCart(responseData.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Set loading ke false setelah pengambilan data selesai, baik berhasil maupun gagal
        }
    };


    const updateQuantity = async (id: string, id_product: string, qty: number) => {
        console.log(id_product)
        try {
            const response = await axios.post(
                `https://beecommers.up.railway.app/api/v1/cart/update/${id}`,
                {
                    id_product,
                    qty
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            console.log(response)
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const increaseQuantity = (id: string, id_product: string, currentQty: number) => {
        const newQty = currentQty + 1;
        setDataCart(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, qty: newQty } : item
            )
        );
        updateQuantity(id, id_product, newQty);
    };

    const decreaseQuantity = (id: string, id_product: string, currentQty: number) => {
        if (currentQty > 1) {
            const newQty = currentQty - 1;
            setDataCart(prevData =>
                prevData.map(item =>
                    item.id === id ? { ...item, qty: newQty } : item
                )
            );
            updateQuantity(id, id_product, newQty);
        }
    };

    const deleteCart = async (id: string) => {
        setDeleteLoading((prev) => ({ ...prev, [id]: true }));
        try {
            const response = await axios.delete(`https://beecommers.up.railway.app/api/v1/cart/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response);
            getDataCart();
        } catch (error) {
            console.error('Error deleting cart:', error);
        } finally {
            setDeleteLoading((prev) => ({ ...prev, [id]: false }));
        }
    }

    const handleOrder = async () => {
        try {
            SweetAlertService.createOrder().then(async (confirmed) => {
                if (confirmed) {
                    const response = await axios.post('https://beecommers.up.railway.app/api/v1/order/create', {}, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    if (response.status === 201) {
                        SweetAlertService.successOrder().then(() => {
                            window.location.reload();
                        })

                    }
                }
            })

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (isOpen) {
            getDataCart();
        }
    }, [isOpen]);

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
                                {dataCart.map((item) => (
                                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="p-4">
                                            <Image src={`https://beecommers.up.railway.app/api/v1/product/img/${item.product.product_img}`} className="w-16 md:w-32 max-w-full max-h-full" width={100} height={100} alt={item.product.name_product} />
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {item.product.name_product}
                                        </td>
                                        <div className="flex items-center justify-center pt-[21px]">
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white flex items-center">
                                                <button onClick={() => decreaseQuantity(item.id, item.id_product, item.qty)} className="bg-gray-200 p-1 rounded-md hover:bg-gray-300">-</button>
                                                <span className="mx-2">{item.qty}</span>
                                                <button onClick={() => increaseQuantity(item.id, item.id_product, item.qty)} className="bg-gray-200 p-1 rounded-md hover:bg-gray-300">+</button>
                                            </td>
                                        </div>

                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            Rp.{item.product.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => deleteCart(item.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">  {deleteLoading[item.id] ? 'Waiting...' : 'Remove'}</button>
                                        </td>
                                    </tr>
                                ))}
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
                                <dd>Rp.{dataCart.reduce((total, item) => total + item.qty * parseInt(item.product.price), 0)}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex justify-end space-x-3">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                        Close
                    </button>
                    <button
                        onClick={handleOrder}
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Order'}
                    </button>
                </div>
            </div>
        </div>
    );
}

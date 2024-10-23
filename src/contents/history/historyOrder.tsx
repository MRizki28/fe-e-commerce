'use client'

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Product from "../home/product";

interface Product {
    id: string;
    name_product: string;
    price: string;
    qty: string
    product_img: string;
    created_at: string;
    itemTotalPrice: string;
}
export default function HistoryOrder() {
       /* eslint-disable @typescript-eslint/no-explicit-any */
    const [dataHistory, setDataHistory] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const getDataHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://beecommers.up.railway.app/api/v1/order/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const responseData = await response.data;
            const formattedData = responseData.data.map((item: any) => {
                const itemTotalPrice = item.price * item.qty; 
    
                return {
                    ...item,
                    created_at: yearFormat(item.created_at),
                    itemTotalPrice,
                };
            });
            console.log(responseData)
            setDataHistory(formattedData);
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false);
        }
    }

    const yearFormat = (date: string) => {
        const parsedDate = new Date(date);
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const day = String(parsedDate.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }
    

    useEffect(() => {
        getDataHistory();
    }, [])

    return (
        <div className="max-w-screen-xl p-7 mx-auto">
            <div className="font-basicCommersialRegular mt-5 mb-3">
                <h1>History Pesanan</h1>
            </div>
            <div className="mt-5">
            {loading ? (
                <div className="flex justify-center items-center h-60">
                    <span className="text-xl">Loading...</span>
                </div>
            ) : dataHistory.length > 0 ? (
                <div className="grid grid-cols-1 gap-y-4 gap-2 md:grid-cols-5 mt-2">
                    <div className="bg-white border flex flex-col max-w-xl md:max-w-md">
                        {dataHistory.map((item, index) => (
                            <>
                                <Image
                                    alt="product"
                                    src={`https://beecommers.up.railway.app/api/v1/product/img/${item.product_img}`}
                                    className="w-full h-60 object-cover p-3 mt-2"
                                    width="388"
                                    height="240"
                                />

                                <div key={index} className="p-5 flex flex-col flex-grow border-t-2">
                                    <div className="flex items-center">
                                        <span className="text-semiBlack">{item.name_product}</span>
                                        <span className="ml-auto text-[12px]">{item.created_at}</span>
                                    </div>
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-brownSkincare">Rp. {item.price}</h5>
                                    <p className="mb-3 font-normal text-[12px] text-black">Total {item.qty} Produk: <b>Rp. {item.itemTotalPrice}</b></p>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-60">
                    <span className="text-xl">No data</span>
                </div>
            )}
            </div>
        </div >
    )
}
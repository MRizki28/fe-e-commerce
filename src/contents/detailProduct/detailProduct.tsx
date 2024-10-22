'use client'

import { RiMoneyDollarBoxFill } from "react-icons/ri";
import Image from 'next/image';
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
    id: string;
    name_product: string;
    stock: number;
    product_img: string;
    price: string;
    description: string;
}

export default function DetailProductContent() {
    const [data, setData] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const getIdFromUrl = usePathname().split("/").pop();

    const getDataById = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://beecommers.up.railway.app/api/v1/product/get/' + getIdFromUrl);
            const responseData = await response.data.data;
            setData(responseData);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                router.push('/');
            } else {
                console.log(error);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getDataById();
    }, [getIdFromUrl]);

    return (
        <>
            <div className="font-basicCommersialRegular mt-5 mb-3">
                <h1>Detail Product</h1>
            </div>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : data ? (
                <div className="border bg-white rounded-xl">
                    <div className="p-8 flex flex-wrap">
                        <div className="font-basicCommersialRegular w-full md:w-1/2 lg:w-2/5 mb-4 md:mb-0 ">
                            <div>
                                <h1 className="text-sm text-semiBlack font-bold">{data.name_product}</h1>
                                <span className="text-[12px] text-greyText">#{data.id}</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-sm text-greyText">Stock: {data.stock}</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-sm text-priceColor">Rp. {parseFloat(data.price).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-sm text-priceColor">{data.description}</span>
                            </div>
                            <div className="mt-2">
                                <form >
                                    <div>
                                        <input type="text" id="name" aria-label="disabled input" className="mb-5 bg-gray-100 border border-gray-300 text-sm rounded-lg   block w-full p-2.5 cursor-not-allowed dark:bg-gray-300 dark:border-[#e8e8e8] dark:placeholder-[#e8e8e8] dark:text-gray-400" defaultValue="" disabled />
                                    </div>
                                    <div>
                                        <input type="text" id="address" aria-label="disabled input" className="mb-5 bg-gray-100 border border-gray-300 text-sm rounded-lg   block w-full p-2.5 cursor-not-allowed dark:bg-gray-300 dark:border-[#e8e8e8] dark:placeholder-[#e8e8e8] dark:text-gray-400" defaultValue="" disabled />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            id="quantity"
                                            className="mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300"
                                            placeholder="1"
                                        />
                                    </div>

                                    <div className="mt-5">
                                        <div>
                                            <button type="submit" className="bg-black text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-gray-700">
                                                +<RiMoneyDollarBoxFill className="text-xl" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="flex justify-center items-center w-full md:w-1/2 lg:w-3/5 ">
                            <Image
                                alt={data.name_product}
                                src={`https://beecommers.up.railway.app/api/v1/product/img/${data.product_img}`}
                                width={460}
                                height={460}
                                className="w-[200px] h-[200px] md:w-[460px] md:h-[460px] object-cover"
                            />
                        </div>

                    </div>
                </div>
            ) : (
                <div className="text-center">Product not found.</div>
            )}
        </>
    );
}

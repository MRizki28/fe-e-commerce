'use client'

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaCartArrowDown } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import SweetAlertService from "@/helper/sweetAlert";

interface Product {
    id: string;
    name_product: string;
    product_img: string;
    price: string;
    description: string;
}

export default function DetailProductContent() {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState(true);
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

    const checkTokenValid = () => {
        const token: any = localStorage.getItem('token');
        if (token) {
            const decodeToken: any = jwtDecode(token);
            if (decodeToken.exp && decodeToken.exp < Math.floor(Date.now() / 1000)) {
                localStorage.removeItem('token');
                setIsLogin(false);
            }
        } else {
            setIsLogin(false);
        }
    }

    const addToCart = async (data: any) => {
        setIsAddingToCart(true); 
        try {
            const response = await axios.post('https://beecommers.up.railway.app/api/v1/cart/add', {
                id_product: getIdFromUrl,
                qty: data.qty,
            },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            console.log(response)
            if (response.status === 201) {
                SweetAlertService.successAddToCart().then(() => {
                    window.location.href = '/';
                });
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsAddingToCart(false);
        }
    }

    const dataName = localStorage.getItem('name');
    const dataAddress = localStorage.getItem('address');

    useEffect(() => {
        getDataById();
        checkTokenValid();
         // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                <span className="text-sm text-priceColor">Rp. {parseFloat(data.price).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-sm text-priceColor">{data.description}</span>
                            </div>
                            <div className="mt-2">
                                <form onSubmit={handleSubmit(addToCart)}>
                                    <div>
                                        <input type="text" id="name" aria-label="disabled input" className="mb-5 bg-gray-100 border border-gray-300 text-sm rounded-lg   block w-full p-2.5 cursor-not-allowed dark:bg-gray-300 dark:border-[#e8e8e8] dark:placeholder-[#e8e8e8] dark:text-gray-400" defaultValue={dataName ?? ''} disabled />
                                    </div>
                                    <div>
                                        <input type="text" id="address" aria-label="disabled input" className="mb-5 bg-gray-100 border border-gray-300 text-sm rounded-lg   block w-full p-2.5 cursor-not-allowed dark:bg-gray-300 dark:border-[#e8e8e8] dark:placeholder-[#e8e8e8] dark:text-gray-400" defaultValue={dataAddress ?? ''} disabled />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            id="qty"
                                            {...register("qty", { required: "Quantity is required" })}
                                            className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.qty ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="1"
                                        />
                                        {errors.qty && (
                                            <p className="text-red-500 text-xs mt-1">{errors.qty?.message as string}</p>
                                        )}
                                    </div>

                                    <div className="mt-5">
                                        <div>
                                            {!isLogin ? (
                                                <Link href="/login" className="bg-black text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-gray-700">
                                                    <RiMoneyDollarBoxFill className="text-xl" />
                                                </Link>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    className="bg-black text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-gray-700"
                                                    disabled={isAddingToCart} // Disable button saat loading
                                                >
                                                    {isAddingToCart ? 'Adding...' : (<>+<FaCartArrowDown className="text-xl" /></>)} {/* Tampilkan loading */}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="flex justify-center items-center w-full md:w-1/2 lg:w-3/5 ">
                            <img
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

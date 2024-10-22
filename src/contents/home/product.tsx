'use client';

import Image from "next/image";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import axios from "axios";

interface ProductType {
    id: number;
    name_product: string;
    product_img: string;
    price: number;
    description: string;
}

export default function Product() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getDataProduct = async (page: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://beecommers.up.railway.app/api/v1/product?page=${page}`);
            const responseData = response.data;
            setProducts(responseData.data);
            setTotalPage(responseData.totalPage);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDataProduct(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <section className="max-w-screen-xl mx-auto p-3">
            <div className="mt-0 md:mt-24 mb-5 flex">
                <div>
                    <h1 className="text-left font-bold text-2xl">PRODUCT</h1>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-60">
                    <span className="text-xl">Loading...</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-y-4 gap-5 md:grid-cols-5">
                    {products.map(product => (
                        <div key={product.id} className="bg-white border flex flex-col max-w-xl md:max-w-xs">
                            <Link href={`detail-product/${product.id}`}>
                                <Image
                                    alt={product.name_product}
                                    src={`https://beecommers.up.railway.app/api/v1/product/img/${product.product_img}`}
                                    className="w-full h-60 object-cover p-3"
                                    width="388"
                                    height="240"
                                />
                            </Link>
                            <div className="p-5 flex flex-col flex-grow border-t-2">
                                <span className="text-semiBlack">{product.name_product}</span>
                                <Link href={`detail-product/${product.id}`}>
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-brownSkincare">
                                        Rp. {product.price}
                                    </h5>
                                </Link>
                                <p className="mb-3 font-normal text-[12px] text-black overflow-hidden text-ellipsis break-words max-h-16">
                                    {product.description}
                                </p>
                                <div className="mt-auto">
                                    <Link href={`detail-product/${product.id}`}>
                                        <button className="bg-red-600 text-white p-2 text-sm rounded-md w-full flex justify-center hover:bg-red-800">
                                            <CiShoppingCart className="text-xl" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious className="cursor-pointer" onClick={handlePreviousPage} aria-disabled={currentPage === 1} />
                        </PaginationItem>
                        {Array.from({ length: totalPage }, (_, index) => (
                            <PaginationItem key={index + 1}>
                                <PaginationLink className="cursor-pointer"
                                    onClick={() => handlePageClick(index + 1)}
                                    aria-current={currentPage === index + 1 ? 'page' : undefined}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext className="cursor-pointer" onClick={handleNextPage} aria-disabled={currentPage === totalPage} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    );
}

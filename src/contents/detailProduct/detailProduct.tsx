import { RiMoneyDollarBoxFill } from "react-icons/ri";
import Image from 'next/image';

export default function DetailProductContent() {
    return (
        <>
            <div className="font-basicCommersialRegular mt-5 mb-3">
                <h1>Detail Product</h1>
            </div>

            <div className="border bg-white rounded-xl">
                <div className="p-8 flex flex-wrap">
                    <div className="font-basicCommersialRegular w-full md:w-1/2 lg:w-2/5 mb-4 md:mb-0 ">
                        <div>
                            <h1 className="text-sm text-semiBlack font-bold">Baju</h1>
                            <span className="text-[12px] text-greyText">#123</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-sm text-greyText">Stock: 2</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-sm text-priceColor">Rp.2000</span>
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
                                        // {...register("quantity", { required: "Quantity is required" })}
                                        className="mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300"
                                        placeholder="1"
                                    />
                                    {/* {errors.quantity && (
                                        <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
                                    )} */}
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
                    <Image
                        alt="product"
                        src="https://beecommers.up.railway.app/api/v1/product/img/1629780136-1.jpg"
                        width={460}
                        height={460}
                        className="w-[200px] h-[200px] md:w-[460px] md:h-[460px] object-cover"
                    />
                </div>
            </div>
        </>



    )
}
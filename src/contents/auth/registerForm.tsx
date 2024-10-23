'use client'
import SweetAlertService from "@/helper/sweetAlert";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post('https://beecommers.up.railway.app/api/v1/user/create/', data);
            const responseData = await response.data;
            console.log(responseData)
            if (response.status === 201) {
                SweetAlertService.successRegister().then(() => {
                    window.location.href = '/login';
                });
            }
        } catch (error: any) {
            console.log(error);
            if (error.response.data.message[0]?.error === "Password confirmation does not match the password.") {
                SweetAlertService.passwordNotMatch();
            }else if(error.response.data.message.error === 'Email already exists'){
                SweetAlertService.emailAlreadyExist();
            } else if (error.response.status === 422) {
                SweetAlertService.passwordValidation();
            }
        }
    };
    return (
        <div className="max-w-screen-xl p-4 mx-auto">
            <div className="border">
                <div className="flex h-screen">
                    <div className="w-full bg-gray-100 lg:w-full flex items-center justify-center">
                        <div className="max-w-md w-full p-6">
                            <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign Up</h1>
                            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Daftar dan nikmati semua produk yang kami tawarkan</h1>
                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <p>email</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email", { required: "Email wajib diisi", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address" } })}
                                        className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email?.message as string}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        {...register("password", { required: "Password is required" })}
                                        className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{errors.password?.message as string}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                                    <input
                                        type="password"
                                        id="passwordConfirmation"
                                        {...register("passwordConfirmation", { required: "Confirmation password is required" })}
                                        className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.passwordConfirmation ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.passwordConfirmation && (
                                        <p className="text-red-500 text-xs mt-1">{errors.passwordConfirmation?.message as string}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register("name", { required: "Name is required" })}
                                        className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.name?.message as string}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">No Handphone</label>
                                    <input
                                        type="text"
                                        id="phone_number"
                                        {...register("phone_number", { required: "No Handphone is required" })}
                                        className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.phone_number ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.phone_number && (
                                        <p className="text-red-500 text-xs mt-1">{errors.phone_number?.message as string}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Alamat</label>
                                    <input
                                        type="text"
                                        id="address"
                                        {...register("address", { required: "Alamat is required" })}
                                        className={`mt-1 p-2 w-full border rounded-md   outline-none transition-colors duration-300 ${errors.address ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-xs mt-1">{errors.address?.message as string}</p>
                                    )}
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800  focus:bg-black  focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign In</button>
                                </div>
                            </form>
                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <p>Sudah punya akun ? <Link href='/login' className="text-black hover:underline">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
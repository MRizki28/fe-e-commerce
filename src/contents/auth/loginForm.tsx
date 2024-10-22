'use client'
import SweetAlertService from "@/helper/sweetAlert";
import axios from "axios";
import Link from "next/link";
import {useForm} from "react-hook-form";

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    

    const onSubmit = async (data: any) => {
        try {   
            const response = await axios.post('https://beecommers.up.railway.app/api/v1/auth/login/', data);
            const responseData = await response.data;
            console.log(responseData)
            if(response.status === 201){
                SweetAlertService.successLogin();
                localStorage.setItem('token', responseData.token);
                window.location.href = '/';
            }
        } catch (error: any) {
            console.log(error);
            if(error.response.status === 422){
                SweetAlertService.passwordValidation();
            }else if(error.response.status === 401){
                SweetAlertService.emailOrPasswordMistant();
            }
        }
    };

    return (
        <div className="max-w-screen-xl p-4 mx-auto">
            <div className="border">
                <div className="flex h-screen">
                    <div className="w-full bg-gray-100 lg:w-full flex items-center justify-center">
                        <div className="max-w-md w-full p-6">
                            <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign In</h1>
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
                                    <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800  focus:bg-black  focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign In</button>
                                </div>
                            </form>
                            <div className="mt-4 text-sm text-gray-600 text-center">
                                <p>Belum punya akun ? <Link href='/register' className="text-black hover:underline">Register</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
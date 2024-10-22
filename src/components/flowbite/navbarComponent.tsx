'use client';

import Cart from "@/contents/cart/cart";
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { jwtDecode } from 'jwt-decode';
import Link from "next/link";
import axios from "axios";
import SweetAlertService from "@/helper/sweetAlert";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    profile: any
}

export default function NavbarComponent() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState<User>();
    const [countCart, setCountCart] = useState(0);

    let idUser = ''
    const checkTokenValid = () => {
        const token: any = localStorage.getItem('token');
        if (token) {
            const decodeToken: any = jwtDecode(token);
            idUser = decodeToken.id;
            if (decodeToken.exp && decodeToken.exp < Math.floor(Date.now() / 1000)) {
                localStorage.removeItem('token');
                setIsLogin(false);
            }
        } else {
            setIsLogin(false);
        }
    }

    const handleOpen = () => {
        setIsCartOpen(true);
    }

    const handleClose = () => {
        setIsCartOpen(false);
    }

    const getDataUser = async () => {
        try {
            const response = await axios.get('https://beecommers.up.railway.app/api/v1/user/get/' + idUser)
            const responseData = await response.data;
            setUser(responseData.data);
            localStorage.setItem('name', responseData.data.profile.name);
            localStorage.setItem('address', responseData.data.profile.address);
        } catch (error) {
            console.log(error)
        }
    }

    const getTotalCart = async () => {
        try {
            const response = await axios.get('https://beecommers.up.railway.app/api/v1/cart', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const responseData = response.data;
            setCountCart(responseData.data.length);
        } catch (error) {
            console.log(error);
        }
    };
    
    console.log(countCart)
    const handleLogout = async () => {
        try {
            SweetAlertService.logoutAlert().then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.post(
                        'https://beecommers.up.railway.app/api/v1/auth/logout', {},
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    );
                    if(response.status == 201){
                        SweetAlertService.successLogout().then(() => {
                            localStorage.removeItem('token');
                            setIsLogin(false);
                            window.location.reload();
                        });
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkTokenValid();
        getDataUser();
        getTotalCart();
    }, [])

    return (
        <>
            <Navbar fluid rounded>
                <NavbarBrand href="https://flowbite-react.com">
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">E-COMMERCE</span>
                </NavbarBrand>
                <div className="flex md:order-2">
                    <div className="flex justify-center items-center space-x-7">
                        {!isLogin ? (
                            <Link href="/login">Login</Link>
                        ) : (
                            <>
                                <button className="relative" type="button" onClick={handleOpen}>
                                    <CiShoppingCart className="text-3xl" />
                                    <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs rounded-full px-1">
                                        {countCart}
                                    </span>
                                </button>
                                <Dropdown
                                    arrowIcon={false}
                                    inline
                                    label={
                                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                                    }
                                >
                                    <DropdownHeader>
                                        {user ? (
                                            <>
                                                <span className="block text-sm">{user.profile?.name}</span>
                                                <span className="block truncate text-sm font-medium">{user.email}</span>
                                            </>
                                        ) : (
                                            <span className="block text-sm">User not logged in</span>
                                        )}
                                    </DropdownHeader>
                                    <DropdownItem>Settings</DropdownItem>
                                    <DropdownDivider />
                                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                                </Dropdown>
                            </>
                        )}
                    </div>
                    <NavbarToggle />
                </div>
                <NavbarCollapse>
                    <NavbarLink href="#">
                        <span className="hover:text-red-700">Home</span>
                    </NavbarLink>
                    <NavbarLink href="#"><span className="hover:text-red-700">History</span></NavbarLink>
                </NavbarCollapse>
            </Navbar>
            <Cart isOpen={isCartOpen} onClose={handleClose} />
        </>
    );
}

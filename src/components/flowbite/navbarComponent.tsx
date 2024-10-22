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
import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";

export default function NavbarComponent() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleOpen = () => {
        setIsCartOpen(true);
    }

    const handleClose = () => {
        setIsCartOpen(false);
    }

    return (
        <>
            <Navbar fluid rounded>
                <NavbarBrand href="https://flowbite-react.com">
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">E-COMMERCE</span>
                </NavbarBrand>
                <div className="flex md:order-2">
                    <div className="flex justify-center items-center space-x-7">
                        <button className="relative" type="button" onClick={handleOpen}>
                            <CiShoppingCart className="text-3xl" />
                            <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs rounded-full px-1">
                                3
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
                                <span className="block text-sm">Bonnie Green</span>
                                <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                            </DropdownHeader>
                            <DropdownItem>Settings</DropdownItem>
                            <DropdownDivider />
                            <DropdownItem>Sign out</DropdownItem>
                        </Dropdown>
                    </div>

                    <NavbarToggle />
                </div>
                <NavbarCollapse>
                    <NavbarLink href="#">
                        <span className="hover:text-red-700">Home</span>
                    </NavbarLink>
                    <NavbarLink href="#"><span className="hover:text-red-700">Products</span></NavbarLink>
                    <NavbarLink href="#"><span className="hover:text-red-700">History</span></NavbarLink>
                </NavbarCollapse>
            </Navbar>
            <Cart isOpen={isCartOpen} onClose={handleClose} />
        </>
    );
}

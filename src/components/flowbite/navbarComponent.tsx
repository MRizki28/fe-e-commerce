
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

export default function NavbarComponent() {
    return (
        <Navbar fluid rounded>
            <NavbarBrand href="https://flowbite-react.com">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">E-COMMERCE</span>
            </NavbarBrand>
            <div className="flex md:order-2">
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
                <NavbarToggle />
            </div>
            <NavbarCollapse>
                <NavbarLink href="#" >
                    <span className="hover:text-red-700">Home</span>
                </NavbarLink>
                <NavbarLink href="#"> <span className="hover:text-red-700">Products</span></NavbarLink>
                <NavbarLink href="#"> <span className="hover:text-red-700">History</span></NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
}

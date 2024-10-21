import { FooterComponent } from "@/components/flowbite/footerComponent";
import NavbarComponent from "@/components/flowbite/navbarComponent";
import DetailProductContent from "@/contents/detailProduct/detailProduct";

export default function DetailProduct() {
    return (
        <div className="flex flex-col min-h-screen max-w-screen-xl self-stretch m-auto w-full ">
            <NavbarComponent></NavbarComponent>
            <main className="flex-grow p-4">
                <div className="mt-0 md:mt-5">
                    <DetailProductContent></DetailProductContent>
                </div>
            </main>
            <FooterComponent></FooterComponent>
        </div>

    )
}
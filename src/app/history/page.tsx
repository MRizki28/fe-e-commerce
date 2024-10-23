import { FooterComponent } from "@/components/flowbite/footerComponent";
import NavbarComponent from "@/components/flowbite/navbarComponent";
import HistoryOrder from "@/contents/history/historyOrder";

export default function History() {
    return (
        <div className="flex flex-col min-h-screen max-w-screen-xl self-stretch m-auto w-full ">
            <NavbarComponent></NavbarComponent>
            <main className="flex-grow p-4">
                <div className="mt-0 md:mt-5">
                    <HistoryOrder></HistoryOrder>
                </div>
            </main>
            <FooterComponent></FooterComponent>
        </div>
    )
}
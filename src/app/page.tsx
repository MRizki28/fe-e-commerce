import Navbar from "@/components/flowbite/navbarComponent";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import hero from "../../public/images/heroSkincare2.webp"
import Product from "@/contents/home/product";
import { FooterComponent } from "@/components/flowbite/footerComponent";

export default function Home() {
  return (
    <main className="max-w-screen-xl self-stretch m-auto w-full">
      <Navbar></Navbar>
      <div className="hidden md:block">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <Image
                src={hero}
                alt="hero"
                width={1920}
                height={1080}
                placeholder="blur"
                blurDataURL={hero.blurDataURL}
                className="w-full"
              />
            </CarouselItem>
            {/* <CarouselItem>...</CarouselItem>
            <CarouselItem>...</CarouselItem> */}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="mt-0 md:mt-5">
        <Product></Product>
      </div>
      <FooterComponent></FooterComponent>
    </main>
  );
}

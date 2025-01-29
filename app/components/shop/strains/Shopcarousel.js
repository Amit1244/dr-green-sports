"use client";
import { options } from "@/app/api/auth/[...nextauth]/options";
import useEmblaCarousel from "embla-carousel-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback, useEffect, useState } from "react";

export default function ShopCarousel({ strains }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: true,
    });

    const buttonNext = useRef(null);
    const buttonPrev = useRef(null);

    const buttonDisable = (button) => {
        button.classList.add("opacity-50");
        button.disabled = true;
    };

    const buttonEnable = (button) => {
        button.classList.remove("opacity-50");
        button.disabled = false;
    };

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
        buttonEnable(buttonNext.current);
        if (!emblaApi.canScrollPrev()) {
            buttonDisable(buttonPrev.current);
        }
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
        buttonEnable(buttonPrev.current);
        if (!emblaApi.canScrollNext()) {
            buttonDisable(buttonNext.current);
        }
    }, [emblaApi]);

    useEffect(() => {
        if (emblaApi) {
            buttonDisable(buttonPrev.current);
            if (!emblaApi.canScrollNext()) {
                buttonDisable(buttonNext.current);
            }
        }
    }, [emblaApi]);

    return (
        <div className="relative">
            {/* Carousel navigation buttons */}
            <button
                title="Previous slide"
                onClick={scrollPrev}
                ref={buttonPrev}
                className="absolute left-10 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full "
            >
                <Image
                    src="/images/icons/prev-nav.svg"
                    alt="Previous Arrow"
                    width={83}
                    height={83}
                />
            </button>
            <div className="container mx-auto px-10 max-w-7xl">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-x-3">
                        {strains && strains?.length > 0 && strains?.map((strain, i) => (
                            <div
                                key={i}
                                className="min-w-[300px]  lg:min-w-[33.33%] rounded-[10px] border-2 border-primary backdrop-blur-[44px] p-6"
                            >
                                <div className="flex gap-2 justify-end items-start">
                                    <p className="py-1 px-3 rounded-full bg-primary font-semibold text-[10px] uppercase">
                                        {strain?.flavour}
                                    </p>
                                    <p className="py-1 px-3 rounded-full bg-primary font-semibold text-[10px] uppercase">
                                        {strain?.type}
                                    </p>
                                </div>
                                <div className="mx-auto my-6 h-0 w-full pb-[100%] relative">
                                    <Image
                                        src={
                                            process.env.NEXT_PUBLIC_IMAGE_SERVER +
                                            strain?.imageUrl
                                        }
                                        alt={strain?.name}
                                        fill
                                        className="object-cover object-center"
                                    />
                                </div>
                                <p className="text-2xl md:text-[28px] font-semibold mb-6">
                                    {strain?.name}
                                </p>
                                <Link href={`/product/${strain.id}`}>
                                    <button
                                        className="w-full tracking-wide uppercase py-4 px-6 rounded-full bg-[#D05D1A] border-[#D05D1A] border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#D05D1A] duration-200 ease-in-out"
                                        title="Discover"
                                    >
                                        Discover
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button
                title="Next slide"
                onClick={scrollNext}
                ref={buttonNext}
                className="absolute right-10 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full "

            >
                <Image
                    src="/images/icons/next-nav.svg"
                    alt="Previous Arrow"
                    width={83}
                    height={83}
                />
            </button>
        </div>
    );
}

"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback, useEffect, useState } from "react";

export default function ShopCarousel({ countryCode, takeStrains }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: true,
    });

    const [strains, setStrains] = useState([]);
    const buttonNext = useRef(null);
    const buttonPrev = useRef(null);

    // Fetch strains data
    const getStrains = useCallback(async () => {
        const payload = { countryCode, take: takeStrains, order: "popularity" };

        const res = await fetch("/api/shop/products/get-strains", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        setStrains(data?.data?.strains || []);
    }, [countryCode, takeStrains]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        getStrains();
    }, [getStrains]);

    return (
        <div className="relative">
            {/* Previous Button */}
            <button
                title="Previous slide"
                onClick={scrollPrev}
                ref={buttonPrev}
                className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full"
            >
                <Image src="/images/icons/prev-nav.svg" alt="Prev" width={83} height={83} />
            </button>

            {/* Carousel */}
            <div className="container mx-auto px-2 md:px-10">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-x-3">
                        {strains && strains?.length > 0 && strains.map((strain, i) => (
                            <div key={i} className="min-w-[300px] lg:min-w-[33.33%] border-2 border-primary backdrop-blur-[44px] p-6">
                                <div className="flex gap-2 justify-end items-start">
                                    <p className="py-1 px-3 bg-primary font-[700] font-montserrat text-[19px] uppercase">{strain.flavour}</p>
                                    <p className="py-1 px-3 bg-primary font-[700] font-montserra text-[19px] uppercase">{strain.type}</p>
                                </div>
                                <div className="mx-auto my-6 h-0 w-full pb-[100%] relative">
                                    <Image
                                        src={process.env.NEXT_PUBLIC_IMAGE_SERVER + strain.imageUrl}
                                        alt={strain.name}
                                        fill
                                        className="object-cover object-center"
                                    />
                                </div>
                                <p className="text-2xl md:text-[28px] font-[300] mb-6 font-Glancyr">{strain.name}</p>
                                <Link href={`/product/${strain.id}`}>
                                    <button
                                        className="w-full tracking-wide font-montserrat uppercase py-4 px-6 rounded-full bg-[#D05D1A] border-[#D05D1A] border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#D05D1A] duration-200 ease-in-out"
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

            {/* Next Button */}
            <button
                title="Next slide"
                onClick={scrollNext}
                ref={buttonNext}
                className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full"
            >
                <Image src="/images/icons/next-nav.svg" alt="Next" width={83} height={83} />
            </button>
        </div>
    );
}

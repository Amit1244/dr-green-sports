"use client";
import { useState, useCallback, useEffect } from "react";
import ShopCarousel from "./Shopcarousel"; // Assuming ShopCarousel is a child component to display strains

export default function ShopStrainsClient1(props) {
    const [count, setCount] = useState(props.takeStrains || 6); // Default to 6 if props.takeStrains is undefined
    const [strains, setStrains] = useState(props.strains || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getStrains = useCallback(async () => {
        setLoading(true);
        setError(null);

        const payload = {
            countryCode: props.countryCode,
            take: count,
            order: "popularity",
        };

        try {
            const res = await fetch("/api/shop/products/get-strains", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            if (data?.data?.strains) {
                setStrains(data.data.strains);
            } else {
                throw new Error("No strains data found.");
            }
        } catch (error) {
            console.error("Failed to fetch strains:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [count, props.countryCode]);

    useEffect(() => {
        getStrains();
    }, [getStrains]);

    const countHandler = () => {
        if (count < props.totalStrains) {
            setCount((prev) => prev + 6);
        }
    };

    return (
        <div>
            {error && (
                <div className="text-red-500 text-center mb-4">
                    Error: {error}
                </div>
            )}
            <ShopCarousel strains={strains} />

            <div className="text-center mt-6">
                <button
                    className={`py-4 px-6 rounded-full bg-transparent border border-[#D05D1A] border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#D05D1A] duration-200 ease-in-out ${count >= props.totalStrains ? "pointer-events-none" : ""
                        }`}
                    title={
                        count >= props.totalStrains
                            ? "NO MORE TO SHOW"
                            : "LOAD MORE"
                    }
                    onClick={countHandler}
                    disabled={count >= props.totalStrains}
                >
                    {count >= props.totalStrains
                        ? "NO MORE TO SHOW"
                        : "LOAD MORE"}
                    {loading && (
                        <svg
                            className="animate-spin ml-2 h-4 w-4 text-white inline"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}

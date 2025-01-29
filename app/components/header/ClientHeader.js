"use client";

import Header from "./header";
import { usePathname } from "next/navigation";

const ClientHeader = () => {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    if (isHomePage) return null; // Do not render Header on the home page

    return <Header />;
};

export default ClientHeader;

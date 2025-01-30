import Header from "./components/header/header";
import Providers from "./components/next-auth/providers";
import "./globals.css";
import Footer from "./components/footer/footer";
import GetContent from "@/lib/wp/get-content";
import ClientHeader from "./components/header/ClientHeader";

export default async function RootLayout({ children }) {
    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        pageContent {
            primaryFontUrl
            primaryFontStyles
            secondaryFontStyles
            secondaryFontUrl
        }
    }
}
    `;
    const pageContent = (await GetContent(query)).pageBy.pageContent;

    return (
        <Providers>
            <html lang="en">
                <head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Cord:wght@400;700&display=swap"
                        rel="stylesheet"
                    />
                    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
                        rel="stylesheet" />
                    <link
                        rel="preconnect"
                        href="https://use.typekit.net"
                        crossOrigin="true"
                    />
                    <link
                        rel="preconnect"
                        href="https://p.typekit.net"
                        crossOrigin="true"
                    />
                    <link href={pageContent.primaryFontUrl} rel="stylesheet" />
                    <link
                        href={pageContent.secondaryFontUrl}
                        rel="stylesheet"
                    />
                    <style>
                        {`
                        body {
                            ${pageContent.primaryFontStyles}
                        }
                        .primary-font {
                            ${pageContent.primaryFontStyles}
                        }
                        .secondary-font {
                            ${pageContent.secondaryFontStyles}
                        }
                        `}
                    </style>
                </head>

                <body className="font-Cord">
                    {/* <!-- Centered Particles Video --> */}
                    {/* <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="video-center"
                    >
                        <source src="/videos/particles.mp4" type="video/mp4" />
                    </video> */}

                    {/* <!-- Bottom Smoke Video --> */}
                    {/* <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="video-bottom"
                    >
                        <source src="/videos/fogg.mp4" type="video/mp4" />
                    </video> */}

                    {/* Main Content */}
                    <div className="main-content">
                        {/* Use the ClientHeader component */}
                        <Header />
                        {children}
                        <Footer />
                    </div>
                </body>

                {/* <body className="relative" id="root">
                    <Header />
                    {children}
                    <Footer />
                </body> */}
            </html>
        </Providers>
    );
}

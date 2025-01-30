import Image from "next/image";
import Link from "next/link";
import FAQs from "./components/general/faqs";
import GetContent from "@/lib/wp/get-content";
import TextHightlight from "./components/animated/text-highlight";
import LowPowerModeVideo from "./components/general/low-power-mode-video";
import GenerateSignature from "@/lib/dapp/generate-signature";
import EligibleConditionsCarousel from "./components/carousels/eligible-conditions-carousel";
import NewsCarousel from "./components/carousels/news-carousel";
import Shopcarousel from "./components/shop/strains/Shopcarousel";
import ShopStrains from "./components/shop/strains/shop-strains";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export async function generateMetadata() {
    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        title
        pageContent {
            heroCelebrityPhoto {
                node {
                    sourceUrl
                }
            }
        }
    }
}
    `;
    const pageBy = (await GetContent(query)).pageBy;

    return {
        title: "Dr. Green: " + pageBy.title,
        description: "Your trusted source for medical cannabis.",
        openGraph: {
            images: [pageBy.pageContent.heroCelebrityPhoto.node.sourceUrl],
        },
    };
}

export default async function Home() {
    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        title
        pageSide {
            featuredStrainId
        }
        pageContent {
            heroPlanet {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            heroCelebrityPhoto {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            referPlanet {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            largeParagraphText
            madePossibleParagraphText
            madePossibleBackgroundImage {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            madePossibleCelebrityImage {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            questionsBackgroundImage {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
        }
    }
    globalContent {
        eligibleConditions {
            condition {
                condition
                description
            }
        }
        threeSteps {
            steps {
                description
                icon {
                    node {
                        mediaDetails {
                            height
                            width
                        }
                        sourceUrl
                        title
                    }
                }
                title
            }
        }
    }
}
    `;
    const content = (await GetContent(query)).pageBy;
    const global = (await GetContent(query)).globalContent;

    const featuredStrainId = content.pageSide.featuredStrainId;
    const payload = { strainId: featuredStrainId };

    const getStrains = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/strains/${payload.strainId}`,
        {
            method: "GET",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(payload),
                "Content-Type": "application/json",
            },
        }
    );
    const strain = await getStrains.json();

    const feed = await fetch(
        "https://rss.app/feeds/v1.1/uE6LV8h0fRax2HfE.json",
        {
            method: "GET",
        }
    );

    const rssItems = (await feed.json()).items;

    const session = await getServerSession(options);
    const countryCode = session?.user?.dappUser?.shippings[0]?.countryCode || "";
    const body = {
        orderBy: "desc",
        countryCode: countryCode,
        take: "9",
        order: "popularity",
    };

    const payload1 = {
        countryCode: countryCode,
        take: "9",
        order: "popularity",
    };

    const params = new URLSearchParams(body).toString();
    // console.log('strains 0000000', session, countryCode, body)
    // const getStrains1 = await fetch("/api/shop/products/get-strains", {
    //     method: "POST",
    //     headers: {
    //         "content-type": "application/json",
    //     },
    //     body: JSON.stringify(payload1),
    // });

    // const strains = await getStrains1.json();

    const availableLocations = strain?.data?.strainLocations.map((loc) => {
        if (loc.isAvailable) return loc.location.country;
    });

    let locationData;
    const fetchCountry = async () => {
        try {
            const response = await fetch(`${process.env.LOCATION}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            locationData = await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    await fetchCountry();

    return (
        <main>
            <div className="container mx-auto px-4 2xl:max-w-[calc(100%_-_5rem)]">
                <div className="flex justify-end text-[31px]">From fredo</div>
            </div>
            <section id="hero" className="pt-20 sm:pt-32 bg-center relative">
                {/* <Image
                    src={content.pageContent.heroPlanet.node.sourceUrl}
                    alt={content.pageContent.heroPlanet.node.title}
                    width={
                        content.pageContent.heroPlanet.node.mediaDetails.width
                    }
                    height={
                        content.pageContent.heroPlanet.node.mediaDetails.height
                    }
                    priority
                    className="absolute top-[-25px] sm:top-0 left-0 max-w-[50%] sm:max-w-[25%]"
                /> */}

                <img
                    src="/images/general/bg.png"
                    alt=""
                    width={
                        content.pageContent.heroPlanet.node.mediaDetails.width
                    }
                    height={
                        content.pageContent.heroPlanet.node.mediaDetails.height
                    }
                    className="absolute w-full h-screen object-fill object-center md:object-none mask-top-bottom -z-10  top-0"
                />

                {/* Content */}
                <div className="relative flex flex-col items-center gap-2 md:gap-7 lg:mt-20 justify-center text-center h-full px-4 space-y-4">
                    <h1
                        className=" text-transparent text-6xl sm:text-8xl uppercase font-extrabold tracking-wide  bg-clip-text"
                        style={{ WebkitTextStroke: "1px #D05D1A" }}
                    >
                        Welcome to
                    </h1>
                    <h2 className="text-white text-4xl sm:text-[140px] font-bold  uppercase  md:mt-8">
                        Goldilocks
                    </h2>
                    {/* <Link
                        href="/shop"
                        className="relative bg-orange-500 hover:bg-orange-600 text-white lg:mt-5 px-6 py-1.5 md:py-3 text-xl md:text-3xl !font-thin shadow-lg transition duration-300"
                    >
                        <span className="absolute top-0.5 right-0.5 w-6 h-6 bg-black clip-path-triangle"></span>
                        Shop Now
                    </Link> */}
                </div>
                <p className="absolute w-full font-Glancyr bottom-3 flex justify-center items-center gap-4 animate-bounce text-lg font-semibold mt-20   z-10">
                    <img
                        src="/images/icons/mouse-icon.svg"
                        alt="Mouse Icon"
                    />
                    Scroll to Discover
                </p>

                <div className="mt-0 lg:mt-[-15%]  w-fit-content ml-auto pointer-events-none max-w-[100%] sm:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] overflow-hidden z-50">
                    <img
                        src={
                            content.pageContent.heroCelebrityPhoto.node
                                .sourceUrl
                        }
                        alt={content.pageContent.heroCelebrityPhoto.node.title}
                        width={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.width
                        }
                        height={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.height
                        }
                        // priority
                        className="object-contain  object-right-bottom ml-[25%]"
                    />
                </div>

            </section>

            {/* <section className="pt-20 sm:pt-0" id="process">
                <div className="container mx-auto px-4">
                    <div>
                        <h2 className="text-center text-4xl sm:text-4xl sm:text-[50px] leading-tight mb-8">
                            Access your treatment <br />
                            <div className="text-primary mt-3">
                                in three easy steps
                            </div>
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 xl:gap-x-20 gap-y-10 text-center">
                            {global.threeSteps.steps.map((step, i) => (
                                <div
                                    key={i}
                                    className={
                                        global.threeSteps.steps.length == i + 1
                                            ? "col-span-1 sm:col-span-2 lg:col-span-1 w-full sm:w-[50%] lg:w-full mx-auto"
                                            : ""
                                    }
                                >
                                    <Image
                                        className="mb-4 mx-auto"
                                        src={step.icon.node.sourceUrl}
                                        alt={step.icon.node.title}
                                        width={
                                            step.icon.node.mediaDetails.width
                                        }
                                        height={
                                            step.icon.node.mediaDetails.height
                                        }
                                    />
                                    <h3 className="text-3xl font-semibold mb-4 text-primary">
                                        {step.title}
                                    </h3>
                                    <p className="text-xl font-light">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10 sm:mt-20">
                            <Link href="/dashboard/eligibility">
                                <button
                                    className="relative uppercase py-4 px-6 rounded-[2px] bg-primary  border-primary border-2 text-[15px] md:text-4xl  shadow hover:shadow-[0_0_15px_0px_#D05D1A] duration-200 ease-in-out"
                                    title="Check Eligibility"
                                >
                                    <span className="absolute top-0 right-0 w-6 h-6  clip-path-triangle bg-black"></span>
                                    Check Eligibility
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* <section className="pt-40" id="eligibile-conditions">
                <div className="container mx-auto px-4">
                    <div>
                        <h2 className="text-4xl sm:text-[50px] leading-tight mb-8 max-w-[900px] md:ml-28">
                            What type of eligible conditions can we help with?
                        </h2>
                        <EligibleConditionsCarousel
                            conditions={global.eligibleConditions}
                        />
                    </div>
                </div>
            </section> */}

            {
                availableLocations && locationData && availableLocations?.[0].toLowerCase().replace(/\s+/g, "") !== locationData?.country?.toLowerCase().replace(/\s+/g, "") && (
                    <>
                        <section id="shop-by-strain" className="relative">
                            <div className="container mx-auto px-4 mt-20">
                                <h2 className="mb-8">
                                    Shop <br />
                                    <span className="green-stroke">by strain</span>
                                </h2>
                            </div>
                            <Shopcarousel countryCode={countryCode}
                                takeStrains={"6"} />

                            <div className="absolute md:top-[40%] max-w-[50%] mix-blend-screen  -z-10">
                                <img src="/images/general/flame1.png" className=" z-10" alt="" />
                            </div>
                        </section>
                    </>
                )
            }

            <section className="relative mt-40 overflow-x-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="mb-8 text-xl font-thin tracking-wider md:text-4xl">
                            NEED A PRESCRIPTION?
                        </p>
                        <h2 className="mb-10 text-5xl sm:text-[74px]">
                            <span className="text-primary">Refer to your doctor</span>
                        </h2>
                        <Link href="/dashboard/eligibility">
                            <button
                                className="relative px-6 py-4 text-[15px] uppercase bg-transparent border-2 border-primary shadow-md md:text-4xl hover:shadow-[0_0_15px_0px_#D05D1A] duration-200 ease-in-out"
                                title="Check Eligibility"
                            >
                                <span className="absolute top-0 right-0 w-6 h-6 bg-primary clip-path-triangle"></span>
                                REFER NOW
                            </button>
                        </Link>
                    </div>
                </div>
            </section>


            <section className="mt-5 lg:mt-40 py-10 sm:py-16 relative ">
                {/* <div className="absolute top-0 left-0 w-full h-full z-[-10] pointer-events-none mask-top-bottom mix-blend-screen">
                    <LowPowerModeVideo
                        image={
                            <Image
                                className="absolute top-0 left-0 w-full h-full z-[-10] object-cover object-center"
                                src="/images/general/smoke-poster.webp"
                                alt="Smoke"
                                width={1920}
                                height={1080}
                            />
                        }
                        video={
                            <video
                                className="absolute top-0 left-0 w-full h-full z-[-10] object-cover object-center"
                                muted
                                loop
                                playsInline
                                autoPlay
                                preload="none"
                                poster="/images/general/smoke-poster.webp"
                                width={1920}
                                height={1080}
                            >
                                <source
                                    src="/videos/smoke.mp4"
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        }
                    />
                </div> */}
                <div className="container mx-auto px-4 md:px-20">
                    <div className="container mx-auto ">
                        <h1
                            className="text-transparent text-lg sm:text-5xl uppercase tracking-tighter leading-6 font-cord font-light  bg-clip-text  text-start stroke-white fill-transparent"
                            style={{
                                WebkitTextStroke: "1px #fff", // Tailwind primary blue
                            }}
                        >
                            BLUE DREAM
                        </h1>
                        <h2 className="text-primary text-4xl sm:text-5xl font-extrabold tracking-normal font-cord text-start uppercase mt-1">
                            BY FREDO
                        </h2>
                    </div>
                    <div className="mx-auto relative sm:max-w-[80%] md:max-w-full backdrop-blur-xl rounded-[4px] border-4 bg-white bg-opacity-10  border-white p-8 sm:p-16 mt-8  grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
                        <button
                            className="uppercase  absolute py-2 px-6 right-5 -top-7 rounded-[2px] bg-primary border-primary border-2 text-[15px] md:text-2xl shadow hover:shadow-[0_0_15px_0px_#D05D1A] duration-200 ease-in-out"
                            title="Eligible Conditions"
                        >
                            Eligible Conditions
                        </button>
                        <div className="relative w-[100%] lg:w-[80%] h-0 pb-[100%] lg:pb-[80%] mx-auto">
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_IMAGE_SERVER +
                                    strain.data.imageUrl
                                }
                                alt={strain.data.name}
                                fill
                                className="sm:p-10 animate-wiggle animate-duration-[4000ms] animate-infinite rounded-full"
                            />
                        </div>
                        <div>
                            <p className="text-3xl font-semibold">
                                {strain.data.name}
                            </p>
                            <hr className="h-[2px] border-none bg-primary my-10" />
                            <p className="text-xl mb-4">
                                <span className="font-bold">FEELINGS: </span>
                                {strain.data.feelings}
                            </p>
                            <p className="text-xl mb-4">
                                <span className="font-bold">HELPS WITH: </span>
                                {strain.data.helpsWith}
                            </p>
                            <p className="text-xl mb-16">
                                <span className="font-bold">FLAVOURS: </span>
                                {strain.data.flavour}
                            </p>
                            <Link href="#eligibile-conditions">
                                <button
                                    className="uppercase  py-4 px-6 relative rounded-[2px] bg-primary border-primary border-2 text-[15px] md:text-4xl shadow hover:shadow-[0_0_15px_0px_#D05D1A] duration-200 ease-in-out"
                                    title="Eligible Conditions"
                                >
                                    <span className="absolute top-0 right-0 w-6 h-6 bg-black clip-path-triangle"></span>
                                    Eligible Conditions
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className="mt-[-30%] lg:mt-[-15%] 2xl:mt-[-20%] w-fit-content ml-auto pointer-events-none max-w-[100%] sm:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] overflow-hidden z-[-10]">
                    <img
                        src={
                            content.pageContent.heroCelebrityPhoto.node
                                .sourceUrl
                        }
                        alt={content.pageContent.heroCelebrityPhoto.node.title}
                        width={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.width
                        }
                        height={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.height
                        }
                        // priority
                        className="object-contain  object-right-bottom ml-[25%] mix-blend-screen"
                    />
                </div>
            </section>

            <section className="pb-10 md:pb-40 relative">
                {/* <Image
                    className="absolute right-0 bottom-0 max-w-[50%] sm:max-w-[40%] md:max-w-[30%] h-auto w-auto object-fit object-left z-[-10] pointer-events-none"
                    src="/images/general/right-rock.webp"
                    alt="Comet"
                    width={735}
                    height={910}
                /> */}
                <div className="container mx-auto px-4 md:px-20 mask-top-bottom">
                    <div className="lg:w-[80%]">
                        <TextHightlight
                            text={
                                <p
                                    className="text-4xl sm:text-5xl font-cord lg:text-[47px] font-bold leading-tight  text-white"
                                    dangerouslySetInnerHTML={{
                                        __html: content.pageContent
                                            .largeParagraphText,
                                    }}
                                />
                            }
                            class="home-text"
                        />
                    </div>
                </div>
            </section>

            {/* <section className="mt-20 sm:mt-0">
                <div className="container mx-auto px-4">
                    <div>
                        <p className="text-[#0aba90] text-lg font-semibold tracking-wider mb-2">
                            NEWS / UPDATES
                        </p>
                        <h2 className="text-4xl sm:text-[50px] leading-tight mb-8">
                            Dr. Green In The Press
                        </h2>
                        <NewsCarousel items={rssItems} />
                    </div>
                </div>
            </section> */}

            {/* <section className="relative pb-32 pt-32 mt-40">
                <span className="absolute top-0 left-0 w-full h-full z-[-9] bg-[rgba(0,0,0,0.25)]" />
                <div className="mask-top-bottom absolute left-0 top-0 w-full h-full z-[-10] pointer-events-none">
                    <Image
                        className="absolute top-0 left-0 h-full w-full object-cover object-top"
                        src={
                            content.pageContent.madePossibleBackgroundImage.node
                                .sourceUrl
                        }
                        alt={
                            content.pageContent.madePossibleBackgroundImage.node
                                .title
                        }
                        width={
                            content.pageContent.madePossibleBackgroundImage.node
                                .mediaDetails.width
                        }
                        height={
                            content.pageContent.madePossibleBackgroundImage.node
                                .mediaDetails.height
                        }
                    />
                </div>
                <div className="container mx-auto px-4">
                    <div>
                        <h2 className="text-4xl sm:text-[50px] leading-tight font-semibold mb-4">
                            Made possible <br />
                            by Dr. Green
                        </h2>
                        <p
                            className="text-[22px] font-light max-w-[750px] mb-8"
                            dangerouslySetInnerHTML={{
                                __html: content.pageContent
                                    .madePossibleParagraphText,
                            }}
                        />
                        <Link href="https://drgreennft.com/" target="_blank">
                            <button
                                className="uppercase py-4 px-6 rounded-full bg-[#0aba90]  border-[#0aba90] border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                                title="Learn More"
                            >
                                Learn More
                            </button>
                        </Link>

                        <div className="mt-10 sm:mt-0 xl:mt-[-10%] pointer-events-none">
                            <div className="ml-auto w-fit flex flex-col justify-center items-center max-w-full">
                                <div className="h-0 pb-[100%] relative max-w-full w-[800px]">
                                    <Image
                                        className="absolute top-0 left-0 h-full w-full object-cover object-center rounded-full"
                                        src={
                                            content.pageContent
                                                .madePossibleCelebrityImage.node
                                                .sourceUrl
                                        }
                                        alt={
                                            content.pageContent
                                                .madePossibleCelebrityImage.node
                                                .title
                                        }
                                        width={
                                            content.pageContent
                                                .madePossibleCelebrityImage.node
                                                .mediaDetails.width
                                        }
                                        height={
                                            content.pageContent
                                                .madePossibleCelebrityImage.node
                                                .mediaDetails.height
                                        }
                                    />
                                </div>
                                <Image
                                    src="/images/general/shadow.webp"
                                    alt="Shadow"
                                    width={654}
                                    height={86}
                                    className="max-w-full w-[623px] h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <div className="h-max">

                <div className="container mx-auto px-4 md:px-20">
                    <h1
                        className="text-transparent text-2xl sm:text-5xl uppercase tracking-tighter leading-6 font-cord font-light bg-clip-text  text-start stroke-white fill-transparent"
                        style={{
                            WebkitTextStroke: "1px #fff", // Tailwind primary blue
                        }}
                    >
                        made possible
                    </h1>
                    <h2 className="text-primary text-4xl sm:text-5xl font-extrabold tracking-normal font-cord text-start uppercase mt-1">
                        by dr.green
                    </h2>
                    <p
                        className="py-3 font-light font-Glancyr"
                        dangerouslySetInnerHTML={{
                            __html: content.pageContent
                                .madePossibleParagraphText,
                        }}
                    />
                    {/* <p className="py-3 font-Glancyr ">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p> */}

                    <Link href="https://drgreennft.com/" target="_blank">
                        <button
                            className="relative py-3 px-6 font-normal uppercase border-2 border-primary bg-transparent text-white text-base md:text-[26px] duration-200 ease-in-out"
                        >
                            <span className="absolute top-0 right-0 w-6 h-6 bg-primary clip-path-triangle"></span>
                            Learn more
                        </button>
                    </Link>
                </div>

                <div
                    className=" relative w-full flex justify-center items-start mt-10 mask-top-bottom"
                    style={{ backgroundImage: 'url(/images/general/gradient-bg.png)', height: "700", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    {/* Left Model Image */}
                    <img
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                        src="/images/general/model1.png"
                        alt="Model 1"
                    />

                    {/* Right Model Image */}
                    <img
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
                        src="/images/general/model2.png"
                        alt="Model 2"
                    />

                    {/* Center Portal GIF */}
                    <img
                        src={
                            content.pageContent.heroCelebrityPhoto.node
                                .sourceUrl
                        }
                        className="z-20 mb-48 w-[50%]"
                        alt={content.pageContent.heroCelebrityPhoto.node.title}
                        width={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.width
                        }
                        height={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.height
                        }
                    />
                </div>
            </div>

            <section className="relative " id="faqs">
                {/* <Image
                    className="absolute bottom-0 left-0 w-full h-full object-right md:object-bottom-right object-cover md:object-fit mask-top-bottom pointer-events-none z-[-10]"
                    src={
                        content.pageContent.questionsBackgroundImage.node
                            .sourceUrl
                    }
                    alt={
                        content.pageContent.questionsBackgroundImage.node.title
                    }
                    width={
                        content.pageContent.questionsBackgroundImage.node
                            .mediaDetails.width
                    }
                    height={
                        content.pageContent.questionsBackgroundImage.node
                            .mediaDetails.height
                    }
                /> */}
                {/* <div className="container mx-auto px-4">
                    <div>
                        <div className="text-center mb-20">
                            <h2 className="text-5xl sm:text-[74px] font-semibold">
                                Questions?
                            </h2>
                            <p className="text-[#0aba90] text-2xl sm:text-3xl font-semibold">
                                We&apos;ve got answers...
                            </p>
                        </div>
                        <FAQs />
                    </div>
                </div> */}
                <section className="relative pt-5 md:pt-40" id="faqs">
                    <div className="container mx-auto px-4 md:px-20">
                        <div>

                            <div className="text-start mb-5 md:mb-20">
                                <h1
                                    className="text-transparent text-lg sm:text-7xl uppercase tracking-wide leading-6 font-cord  bg-clip-text  text-start stroke-white fill-transparent"
                                    style={{
                                        WebkitTextStroke: "0.1px #fff", // Tailwind primary blue
                                    }}
                                >
                                    Questions?
                                </h1>
                                <h2 className="text-primary text-4xl sm:text-5xl font-extrabold tracking-normal font-cord text-start uppercase mt-1">
                                    We&apos;ve got answers
                                </h2>
                            </div>
                            <FAQs />
                        </div>
                    </div>
                </section>
            </section>

            <section className="mt-20">
                <div className="container mx-auto px-4">
                    <div>
                        <div className=" text-center">
                            <p className="text-3xl font-semibold mb-4 uppercase font-Cord">
                                Something else on your mind? 🧐
                            </p>
                            <Link href="mailto:support@drgreennft.com">
                                <button
                                    className="uppercase relative py-4 px-6  tracking-wide  bg-primary border-primary border-2 text-3xl font-light   shadow hover:shadow-[0_0_15px_0px_#D05D1A] duration-200 ease-in-out"
                                    title="Reach Out"
                                >
                                    <span className="absolute top-0 right-0 w-6 h-6 bg-black clip-path-triangle"></span>
                                    Reach Out
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    );
}

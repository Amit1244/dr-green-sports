"use client";
import { registerNewUser } from "@/lib/form-actions/actions";
import {
    useRef,
    useState,
    useMemo,
    useActionState,
    startTransition,
} from "react";
import Link from "next/link";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import countryList from "react-select-country-list";

export default function RegisterForm() {
    const [state, action, isPending] = useActionState(
        registerNewUser,
        undefined
    );
    const form = useRef("");
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        startTransition(() => action(formData));
    }

    // Tel
    const [telValue, setTelValue] = useState("");
    const [phoneCodeValue, setPhoneCodeValue] = useState("");
    const setTelHandler = (value) => {
        setTelValue(value || "");
        const phoneParsed = parsePhoneNumber(value || "");
        if (phoneParsed)
            setPhoneCodeValue(phoneParsed.countryCallingCode || "");
    };

    // Country
    const labelState = useRef(null);
    const labelCity = useRef(null);
    const options = useMemo(() => countryList().getData(), []);
    const [countryValue, setCountryValue] = useState("");
    const setCountryHandler = (value) => {
        if (value == "GB") {
            labelState.current.textContent = "County";
            labelCity.current.textContent = "Town";
        } else {
            labelState.current.textContent = "State";
            labelCity.current.textContent = "City";
        }
        setCountryValue(countryList().getLabel(value) || "");
    };

    // Business
    const businessBlock = useRef(null);
    const businessHandler = (value) => {
        if (value) {
            const height = businessBlock.current
                .querySelector(".height")
                .getBoundingClientRect().height;
            businessBlock.current.style.height = `${height}px`;
        } else {
            businessBlock.current.style.height = `0px`;
        }
    };
    const [businessCountryValue, setBusinessCountryValue] = useState("");
    const businessLabelState = useRef(null);
    const businessLabelCity = useRef(null);
    const setBusinessCountryHandler = (value) => {
        if (value == "GB") {
            businessLabelState.current.textContent = "County";
            businessLabelCity.current.textContent = "Town";
        } else {
            businessLabelState.current.textContent = "State";
            businessLabelCity.current.textContent = "City";
        }
        setBusinessCountryValue(countryList().getLabel(value) || "");
    };

    return (
        <form
            ref={form}
            onSubmit={handleSubmit}
            id="register"
            name="register"
            className="grid grid-cols-1 gap-4"
        >
            <p className="text-2xl md:text-[28px] text-[#D05D1A] font-semibold mb-4">
                Contact Details
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="text-[#D05D1A]">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={20}
                            name="firstName"
                            id="firstName"
                            type="text"
                            placeholder="Enter firstName"
                            autoComplete="given-name"
                            className="p-4 rounded-[7px] border-2 text-white border-[#D05D1A] bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.firstName && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.firstName}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="lastName" className="text-[#D05D1A]">
                        Last Name <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={20}
                            name="lastName"
                            id="lastName"
                            type="text"
                            placeholder="Enter lastName"
                            autoComplete="family-name"
                            className="p-4 rounded-[7px] border-2 text-white border-[#D05D1A] bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.lastName && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.lastName}
                        </p>
                    )}
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="text-[#D05D1A]">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            maxLength={255}
                            required
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            autoComplete="email"
                            className="p-4 rounded-[7px] text-white border-2 border-[#D05D1A]  bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.email && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.email}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="contactNumber" className="text-[#D05D1A]">
                        Contact Number <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                        maxLength={20}
                        value={telValue}
                        withCountryCallingCode={true}
                        defaultCountry="US"
                        placeholder="Enter Contact Number"
                        onChange={setTelHandler}
                        className="p-4 rounded-[7px] border-2 border-[#D05D1A] text-gray-500 bg-transparent outline-0 w-full font-medium"
                        name="contactNumber"
                        id="contactNumber"
                        required
                    />
                    <input
                        id="phoneCode"
                        name="phoneCode"
                        autoComplete="tel-country-code"
                        type="hidden"
                        required
                        value={phoneCodeValue}
                    />
                    {state?.errors?.contactNumber && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.contactNumber}
                        </p>
                    )}
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="username" className="text-[#D05D1A]">
                        Username <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={50}
                            minLength={5}
                            name="username"
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            autoComplete="username"
                            className="p-4 rounded-[7px] text-white border-2 border-[#D05D1A] bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.username && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.username}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="password" className="text-[#D05D1A]">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            maxLength={100}
                            required
                            name="password"
                            id="password"
                            type="password"
                            autoComplete="password"
                            placeholder="Enter password"
                            className="p-4 rounded-[7px] border-2 text-white border-[#D05D1A] bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.password && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.password}
                        </p>
                    )}
                </div>
            </div>
            <p className="text-2xl md:text-[28px] font-semibold mb-4 mt-4 text-[#D05D1A]">
                Shipping Address
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="address1" className="text-[#D05D1A]">
                        Address Line 1 <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={50}
                            name="address1"
                            id="address1"
                            type="text"
                            autoComplete="address-line1"
                            placeholder="Enter address1"
                            className="p-4 rounded-[7px] border-2 text-white border-[#D05D1A] bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.address1 && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.address1}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="address2" className="text-[#D05D1A]">Address Line 2</label>
                    <div>
                        <input
                            name="address2"
                            maxLength={50}
                            id="address2"
                            type="text"
                            placeholder="Enter address2"
                            autoComplete="address-line2"
                            className="p-4 rounded-[7px] border-2 text-white border-[#D05D1A]  bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="landmark" className="text-[#D05D1A]">Landmark</label>
                    <div>
                        <input
                            name="landmark"
                            maxLength={50}
                            id="landmark"
                            type="text"
                            placeholder="Enter landmark"
                            className="p-4 rounded-[7px] border-2 text-white border-[#D05D1A] bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="city" className="text-[#D05D1A]">
                        <span ref={labelCity}>City</span>{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={50}
                            name="city"
                            id="city"
                            type="text"
                            autoComplete="address-level2"
                            placeholder="Enter city"
                            className="p-4 rounded-[7px] border-2 text-white border-[#D05D1A] bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.city && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.city}
                        </p>
                    )}
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="state" className="text-[#D05D1A]">
                        <span ref={labelState}>State</span>{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={50}
                            name="state"
                            id="state"
                            type="text"
                            placeholder="Enter state"
                            autoComplete="address-level1"
                            className="p-4 rounded-[7px] border-2 border-[#D05D1A] text-white bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.state && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.state}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="postalCode" className="text-[#D05D1A]">
                        Postal Code <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={15}
                            name="postalCode"
                            id="postalCode"
                            type="text"
                            autoComplete="postal-code"
                            placeholder="Enter postalCode"
                            className="p-4 rounded-[7px] border-2 border-[#D05D1A] text-white bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.postalCode && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {postalCode?.errors?.postalCode}
                        </p>
                    )}
                </div>
            </div>
            <div>
                <label htmlFor="countryCode" className="text-[#D05D1A]">
                    Country <span className="text-red-500">*</span>
                </label>
                <div>
                    <select
                        id="countryCode"
                        name="countryCode"
                        autoComplete="country"
                        placeholder="Enter country"
                        className="appearance-none p-4 rounded-[7px] border-2 border-[#D05D1A] text-gray-400 bg-transparent outline-0 w-full font-medium"
                        required
                        onChange={(e) => setCountryHandler(e.target.value)}
                    >
                        <option value="">Please select a country...</option>
                        {options.map((option, i) => (
                            <option value={option.value} key={i}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <input
                        type="hidden"
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        required
                        value={countryValue}
                    />
                </div>
                {state?.errors?.countryCode && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.countryCode}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="business" className="cursor-pointer text-[#D05D1A]">
                    <input
                        name="business"
                        id="business"
                        type="checkbox"
                        className="mr-2"
                        onClick={(e) => businessHandler(e.target.checked)}
                    />
                    Business?
                </label>
            </div>
            <div
                className="business h-0 overflow-hidden duration-500 ease-in-out"
                ref={businessBlock}
            >
                <div className="height grid gap-4">
                    <p className="text-2xl md:text-[28px] font-semibold mb-4 mt-4">
                        Business Details
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="businessType" className="text-[#D05D1A]">Business Type</label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessType"
                                    id="businessType"
                                    type="text"
                                    className="p-4 rounded-[7px] border-2 border-[#D05D1A]  bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessName" className="text-[#D05D1A]">Business Name</label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessName"
                                    id="businessName"
                                    type="text"
                                    autoComplete="organization"
                                    className="p-4 rounded-[7px] border-2 border-[#D05D1A]  bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessAddress1" className="text-[#D05D1A]">
                                Address Line 1
                            </label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessAddress1"
                                    id="businessAddress1"
                                    type="text"
                                    autoComplete="address-line1"
                                    className="p-4 rounded-[7px] border-2 border-[#D05D1A]  bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessAddress2" className="text-[#D05D1A]">
                                Address Line 2
                            </label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessAddress2"
                                    id="businessAddress2"
                                    type="text"
                                    autoComplete="address-line2"
                                    className="p-4 rounded-[7px] border-2 border-[#D05D1A]  bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessLandmark" className="text-[#D05D1A]">Landmark</label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessLandmark"
                                    id="businessLandmark"
                                    type="text"
                                    className="p-4 rounded-[7px] border-2 border-[#D05D1A]  bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessCity" className="text-[#D05D1A]">
                                <span ref={businessLabelCity}>City</span>
                            </label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessCity"
                                    id="businessCity"
                                    type="text"
                                    autoComplete="address-level2"
                                    className="p-4 rounded-[7px] border-2 border-[#D05D1A]  bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessState" className="text-[#D05D1A]">
                                <span ref={businessLabelState}>State</span>
                            </label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessState"
                                    id="businessState"
                                    type="text"
                                    autoComplete="address-level1"
                                    className="p-4 rounded-[7px] border-2 border-[#D05D1A]  bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessPostalCode" className="text-[#D05D1A]">
                                Postal Code
                            </label>
                            <div>
                                <input
                                    maxLength={15}
                                    name="businessPostalCode"
                                    id="businessPostalCode"
                                    type="text"
                                    autoComplete="postal-code"
                                    className="p-4 rounded-[7px] border-2 border-[#D05D1A]  bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="businessCountryCode" className="text-[#D05D1A]">Country</label>
                        <div>
                            <select
                                id="businessCountryCode"
                                name="businessCountryCode"
                                autoComplete="country"
                                className="appearance-none p-4 rounded-[7px] border-2 border-[#D05D1A]  bg-transparent outline-0 w-full font-medium"
                                onChange={(e) =>
                                    setBusinessCountryHandler(e.target.value)
                                }
                            >
                                <option value="">
                                    Please select a country...
                                </option>
                                {options.map((option, i) => (
                                    <option value={option.value} key={i}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="hidden"
                                id="BusinessCountry"
                                name="BusinessCountry"
                                autoComplete="country-name"
                                value={businessCountryValue}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center gap-4">
                <button
                    type="submit"
                    title="REGISTER"
                    className={`py-4 px-6 rounded-full border-[#D05D1A] border-2 bg-[#D05D1A] shadow hover:shadow-[0_0_15px_0px_#D05D1A] duration-200 ease-in-out cursor-pointer flex gap-2 justify-center items-center ${isPending ? "pointer-events-none" : ""
                        }`}
                >
                    REGISTER
                    <svg
                        className={`animate-spin h-4 w-4 text-white ${isPending ? "inline" : "hidden"
                            }`}
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
                </button>
                <p className="text-[#D05D1A]">Or</p>
                <Link href="/login">
                    <button
                        title="LOGIN"
                        className="py-4 px-6 rounded-full bg-transparent text-white border-[#D05D1A] border-2 shadow hover:shadow-[0_0_15px_0px_#D05D1A] duration-200 ease-in-out"
                    >
                        LOGIN
                    </button>
                </Link>
            </div>
            {state?.errors?.system && (
                <p className="text-red-500 text-center">
                    {state?.errors?.system}
                </p>
            )}
            {state?.success && (
                <p className="text-[#D05D1A] text-center">{state?.message}</p>
            )}
        </form>
    );
}

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TextWithHighlight from "../../../Utils/TextWithHighlight";

const IconCheck = () => (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#D62828" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </span>
);

const IconStack = () => (
    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent">
        <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" fill="#D62828" />
            <path
                d="M10.667 13.333L16 16l5.333-2.667M16 21.333l-5.333-2.666M16 21.333l5.333-2.666M10.667 18.667V13.333M21.333 18.667V13.333M16 10.667l5.333 2.666-5.333 2.667-5.333-2.667L16 10.667z"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </span>
);

const IconUsers = () => (
    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent">
        <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" fill="#D62828" />
            <path
                d="M21.333 22.667v-1.334A2.667 2.667 0 0 0 18.667 18.667h-5.334A2.667 2.667 0 0 0 10.667 21.333v1.334M16 16a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667z"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </span>
);

const AboutSeccionWhy = ({ data, beneficios_clave, core_values }) => {
    const beneficiosArray = beneficios_clave
        ? beneficios_clave?.description.split(",").map((item) => item.trim())
        : [];
    return (
        <div className="w-full bg-primary px-[5%] py-20 font-paragraph text-white relative">
            <section className=" flex flex-col lg:flex-row gap-10 items-center">
                {/* Columna izquierda */}
                <div className="flex-1 max-w-2xl">
                    <div className="flex items-center mb-4">
                        <div className=" mr-2">
                            <span>
                                <svg
                                    width="15"
                                    height="24"
                                    viewBox="0 0 15 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.50225 0C5.95566 0 4.69727 1.2584 4.69727 2.80499C4.69727 4.35158 5.95566 5.60998 7.50225 5.60998C9.04885 5.60998 10.3072 4.35158 10.3072 2.80499C10.3072 1.2584 9.04885 0 7.50225 0Z"
                                        fill="#D62828"
                                    />
                                    <path
                                        d="M7.50112 24.0025C3.65842 24.0025 0.759766 22.4639 0.759766 20.4219C0.759766 19.9629 1.13269 19.59 1.59168 19.59C2.05066 19.59 2.42359 19.9629 2.42359 20.4219C2.42359 21.203 4.40166 22.3387 7.49981 22.3387C10.5993 22.3387 12.576 21.2043 12.576 20.4219C12.576 19.8743 12.4874 19.3657 12.3048 18.8689C12.147 18.4373 12.3674 17.9601 12.799 17.801C13.2306 17.6432 13.7092 17.8636 13.8669 18.2952C14.1147 18.9693 14.2399 19.6839 14.2399 20.4206C14.2425 22.4639 11.3451 24.0025 7.50112 24.0025Z"
                                        fill="#D62828"
                                    />
                                    <path
                                        d="M11.4896 21.804C12.3046 21.4414 12.7754 20.9968 12.8132 20.6225C5.70098 16.9581 5.32021 11.2634 5.32021 10.1015C5.32021 9.64249 4.94725 9.26953 4.48823 9.26953C4.02921 9.26953 3.65625 9.64249 3.65625 10.1015C3.65625 11.4082 4.06181 17.6884 11.4896 21.804Z"
                                        fill="#D62828"
                                    />
                                    <path
                                        d="M7.49991 6.25781C5.37954 6.25781 3.6543 7.98306 3.6543 10.1034C3.6543 10.5624 4.02725 10.9354 4.48627 10.9354C4.9453 10.9354 5.31825 10.5624 5.31825 10.1034C5.31825 8.9011 6.29628 7.92177 7.49991 7.92177C8.70353 7.92177 9.68156 8.8998 9.68156 10.1034C9.68156 10.9432 8.14671 11.9108 6.66272 12.8458C6.33019 13.0558 5.98722 13.2709 5.64296 13.4965C5.81248 13.9855 6.03026 14.5059 6.31454 15.047C6.72531 14.7732 7.1426 14.5111 7.55077 14.2542C9.58768 12.971 11.3468 11.8626 11.3468 10.1034C11.3455 7.98306 9.62158 6.25781 7.49991 6.25781Z"
                                        fill="#D62828"
                                    />
                                    <path
                                        d="M4.23503 14.4766C2.36765 15.8954 0.759766 17.7158 0.759766 20.4191C0.759766 20.8781 1.13272 21.251 1.59174 21.251C2.05076 21.251 2.42372 20.8781 2.42372 20.4191C2.42372 18.5465 3.53085 17.1707 4.95486 16.0271C4.66406 15.4937 4.42673 14.9734 4.23503 14.4766Z"
                                        fill="#D62828"
                                    />
                                </svg>
                            </span>
                        </div>
                        <h3 className="uppercase text-white text-sm lg:text-lg font-bold">
                            ¿Por qué elegirnos?
                        </h3>
                    </div>

                    <h2 className="text-4xl lg:text-[52px] text-white font-medium mb-6 max-w-lg leading-tight italic">
                        <TextWithHighlight
                            text={data?.title}
                            color="bg-accent"
                        />
                    </h2>
                    <p className="text-white text-base  mb-6 max-w-xl">
                        {data?.description}
                    </p>
                    {/* Lista de checks */}
                    {!!beneficios_clave?.visible &&
                        beneficiosArray.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                {beneficiosArray.map((beneficio, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="text-accent">
                                            <svg
                                                width="20"
                                                height="20"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="12"
                                                    fill="#D62828"
                                                />
                                                <path
                                                    d="M8.5 12.5l2 2 5-5"
                                                    stroke="#fff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        <span className="text-white text-base">
                                            {beneficio}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                </div>

                {/* Columna derecha: imagen */}
                <div className="flex-1  w-full flex items-center justify-center">
                    <div className="rounded-2xl overflow-hidden w-full ">
                        <img
                            src={`/api/landing_home/media/${data?.image}`}
                            alt={data?.title}
                            className="w-full h-[420px] object-cover"
                        />
                    </div>
                </div>
            </section>
            {/* Beneficios destacados - Swiper en mobile, grid en desktop */}
            <div className="w-full pt-10">
                <div className="block md:hidden">
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={1.2}
                        centeredSlides={false}
                        loop={true}
                        className="mySwiper"
                    >
                        {core_values?.map((value, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col items-start bg-primary">
                                    <div className="bg-accent rounded-full p-3 mr-4">
                                        <img
                                            src={`/api/core_value/media/${value?.image}`}
                                            alt={value?.name}
                                            className="w-6 h-6 object-cover rounded-xl"
                                        />
                                    </div>
                                    <h3 className="text-white text-xl font-medium mt-2 mb-1">
                                        {value?.name}
                                    </h3>
                                    <p className="text-white text-base font-light">
                                        {value?.description}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="hidden md:grid grid-cols-4 gap-6">
                    {/* Desktop grid */}
                    {core_values?.map((value, index) => (
                        <div className="flex flex-col items-start" key={index}>
                            <div className="bg-accent rounded-full p-3 mr-4">
                                <img
                                    src={`/api/core_value/media/${value?.image}`}
                                    alt={value?.name}
                                    className="w-6 h-6 object-cover rounded-xl"
                                />
                            </div>
                            <h3 className="text-white text-xl font-medium mt-4 mb-1">
                                {value?.name}
                            </h3>
                            <p className="text-white text-base font-light">
                                {value?.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutSeccionWhy;

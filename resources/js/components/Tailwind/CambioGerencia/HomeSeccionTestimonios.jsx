import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TextWithHighlight from "../../../Utils/TextWithHighlight";

const HomeSeccionTestimonios = ({ bg_color, data, testimonios }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
    };

    const goToSlide = (idx) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideToLoop(idx);
        }
    };
    if (testimonios?.length === 0) return null;

    return (
        <div className={`w-full ${bg_color || "bg-white"} py-16 md:py-24`}>
            <div className="px-[5%] mx-auto flex flex-col md:flex-row items-stretch gap-0 md:gap-12 ">
                {/* Imagen izquierda */}
                <div className="order-1 lg:order-none w-full md:w-5/12 flex items-center justify-center mb-10 md:mb-0">
                    <div className="w-full mt-8 lg:mt-0 lg:h-[700px] flex items-center justify-center">
                        <img
                            src={`/api/landing_home/media/${data?.image}`}
                            alt={data?.title}
                            className="w-full lg:w-auto  h-auto lg:h-full object-cover rounded-3xl "
                        />
                    </div>
                </div>
                {/* Swiper derecha */}
                <div className="w-full md:w-7/12 flex flex-col justify-center">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <span>
                                <svg
                                    width="18"
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
                            <span className="uppercase text-neutral-dark text-sm lg:text-lg font-bold">
                                Testimonios
                            </span>
                        </div>
                        <h2 className="text-[32px] lg:text-[52px] max-w-xl font-medium mb-6 leading-tight italic">
                            <TextWithHighlight text={data?.title} />
                        </h2>
                        <p className="mt-2  text-lg text-neutral max-w-xl">
                            {data?.description}
                        </p>
                    </div>
                    <div className="relative">
                        <Swiper
                            ref={swiperRef}
                            slidesPerView={1}
                            spaceBetween={0}
                            loop={true}
                            autoplay={{
                                delay: 7000,
                                disableOnInteraction: false,
                            }}
                            pagination={false}
                            modules={[Pagination, Autoplay]}
                            onSlideChange={handleSlideChange}
                            className="testimonial-swiper"
                        >
                            {testimonios?.map((testimonio, idx) => (
                                <SwiperSlide
                                    key={testimonio.id}
                                    className="lg:px-8"
                                >
                                    <div className=" relative  lg:px-8 py-10 flex flex-col gap-4">
                                        <div className="absolute top-0 lg:top-4 lg:-left-4">
                                            <svg
                                                width="35"
                                                height="25"
                                                viewBox="0 0 35 25"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M16.2994 1.83637L13.9957 0.0039087C5.3229 4.71595 1.25754 10.0824 0.173444 16.1034C-0.639627 21.0772 1.39305 25.0039 6.5425 25.0039C10.2013 25.0039 13.7246 22.6479 14.5377 18.7212C15.2153 14.14 12.505 11.3913 9.11723 10.7369C10.4723 6.28663 16.1638 1.83637 16.2994 1.83637ZM27.9534 10.4751C29.444 6.15575 34.8645 1.83637 35 1.83637L32.6963 0.00391197C24.0235 4.71595 19.9582 10.0824 18.8741 16.1034C18.061 21.0772 20.0937 25.0039 25.2431 25.0039C28.902 25.0039 32.4253 22.6479 33.1028 18.7212C33.9159 14.14 31.3412 11.1296 27.9534 10.4751Z"
                                                    fill="#D62828"
                                                />
                                            </svg>
                                        </div>

                                        <p className="text-2xl text-neutral-dark  mb-4">
                                            {testimonio?.description}
                                        </p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-blue-600 text-lg uppercase">
                                                <img
                                                    src={`/api/testimony/media/${testimonio?.image}`}
                                                    alt={testimonio?.name}
                                                    className="w-6 h-6 object-cover rounded-xl"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-neutral-dark">
                                                    {testimonio?.name}
                                                </div>
                                                <div className="text-sm text-accent font-medium">
                                                    {testimonio?.position},{" "}
                                                    {testimonio?.correlative}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {/* Custom pagination, alineada a la derecha */}
                        <div className="flex gap-2 lg:-mt-8 justify-center lg:absolute bottom-14 lg:right-8 z-[999]">
                            {testimonios.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToSlide(idx)}
                                    className={`transition-all duration-300 rounded-full
                                        ${
                                            activeIndex === idx
                                                ? "bg-accent w-6 h-2"
                                                : "bg-neutral-light w-2 h-2"
                                        }`}
                                    aria-label={`Ir al testimonio ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSeccionTestimonios;

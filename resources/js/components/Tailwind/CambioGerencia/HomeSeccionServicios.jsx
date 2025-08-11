import { ArrowRight, PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import TextWithHighlight from '../../../Utils/TextWithHighlight';
import WhatsAppButton, { WhatsAppButtonWithArrow } from '../../Shared/WhatsAppButton';
import DynamicAd from '../../Shared/DynamicAd';

// Placeholder SVGs for icons (replace with your actual icons if available)
// Using a generic icon for all cards for simplicity in this example.
const GenericIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
        <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 .75-2.251C3.129 9.766 6.016 8.18 9.315 7.584ZM15 17.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd" />
    </svg>
);


const ServiceCard = ({
    name,
    title,
    description,
    slug,
    linkText = "+ información",
    bgColor = "bg-white",
    textColor = "text-slate-800",
    titleColor = "text-slate-900",
    iconBgColor = "bg-red-500",
    image,
    active = false
}) => {
    // Usar name si existe, sino title
    const cardTitle = name || title;
    // Si hay imagen, mostrar overlay azul al hover o si está activo
    return (
        <a
         href={`/servicio/${slug}`}
            className={` relative font-paragraph customtext-neutral-dark bg-white p-6 rounded-lg shadow-xl flex flex-col h-[350px] z-10 group overflow-hidden
                ${active ? 'text-white scale-105 opacity-100' : ''}
                ${!active ? 'lg:hover:text-white lg:hover:scale-105 lg:hover:opacity-100' : ''}
            `}
            style={{
                boxShadow: active ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)' : undefined,
                zIndex: active ? 20 : 10,
            }}
        >
            {image && (
                <div
                    className={`absolute inset-0 rounded-lg overflow-hidden transition-opacity duration-300 pointer-events-none z-0
                        ${active ? 'opacity-100' : 'opacity-0'}
                        lg:group-hover:opacity-100
                    `}
                    style={{
                        backgroundImage: `linear-gradient(rgba(37,99,235,0.8), rgba(37,99,235,0.9)), url('${image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '0.5rem',
                        overflow: 'hidden',
                    }}
                />
            )}
            <div className={`p-3 rounded-full  w-12 h-12 flex items-center justify-center mb-4 z-10 relative bg-accent`}>
                <GenericIcon />
            </div>
            <h3 className={`text-[28px] font-medium mb-2  z-10 relative`}>{cardTitle}</h3>
            <p className={` mb-4 flex-grow  z-10 relative`}>{description}</p>
            <a  href={`/servicio/${slug}`} className={`mt-auto  font-semibold flex gap-2  z-10 relative`}>
                <PlusIcon />  más información
            </a>
        </a>
    );
};

const HomeSeccionServicios = ({ data, allServices }) => {
    // Dividir allServices en dos arrays para la versión desktop
    console.log(allServices);
    const servicesRow1 = allServices ? allServices.slice(0, Math.ceil(allServices.length / 2) - 1) : [];
    const servicesRow2 = allServices ? allServices.slice(Math.ceil(allServices.length / 2) + 1) : [];

    // Swiper state for mobile
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative bg-neutral-light py-16  lg:py-24  overflow-hidden">
            {/* Imagen de fondo debajo de los cards */}
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                <img
                    src="/assets/cambiogerencia/mask-servicios.png"
                    alt="Equipo de Cambio Gerencia"
                    className="w-auto h-full object-cover rounded-xl"
                />
            </div>
            <div className=" z-10 relative">
                {/* Header Section */}
                <div className="text-center mb-12 lg:mb-16 px-[5%] mx-auto">
                    <div className="flex w-full justify-center  mb-4">
                        <div className=" mr-2">
                            <span>
                                <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.50225 0C5.95566 0 4.69727 1.2584 4.69727 2.80499C4.69727 4.35158 5.95566 5.60998 7.50225 5.60998C9.04885 5.60998 10.3072 4.35158 10.3072 2.80499C10.3072 1.2584 9.04885 0 7.50225 0Z" fill="#D62828" />
                                    <path d="M7.50112 24.0025C3.65842 24.0025 0.759766 22.4639 0.759766 20.4219C0.759766 19.9629 1.13269 19.59 1.59168 19.59C2.05066 19.59 2.42359 19.9629 2.42359 20.4219C2.42359 21.203 4.40166 22.3387 7.49981 22.3387C10.5993 22.3387 12.576 21.2043 12.576 20.4219C12.576 19.8743 12.4874 19.3657 12.3048 18.8689C12.147 18.4373 12.3674 17.9601 12.799 17.801C13.2306 17.6432 13.7092 17.8636 13.8669 18.2952C14.1147 18.9693 14.2399 19.6839 14.2399 20.4206C14.2425 22.4639 11.3451 24.0025 7.50112 24.0025Z" fill="#D62828" />
                                    <path d="M11.4896 21.804C12.3046 21.4414 12.7754 20.9968 12.8132 20.6225C5.70098 16.9581 5.32021 11.2634 5.32021 10.1015C5.32021 9.64249 4.94725 9.26953 4.48823 9.26953C4.02921 9.26953 3.65625 9.64249 3.65625 10.1015C3.65625 11.4082 4.06181 17.6884 11.4896 21.804Z" fill="#D62828" />
                                    <path d="M7.49991 6.25781C5.37954 6.25781 3.6543 7.98306 3.6543 10.1034C3.6543 10.5624 4.02725 10.9354 4.48627 10.9354C4.9453 10.9354 5.31825 10.5624 5.31825 10.1034C5.31825 8.9011 6.29628 7.92177 7.49991 7.92177C8.70353 7.92177 9.68156 8.8998 9.68156 10.1034C9.68156 10.9432 8.14671 11.9108 6.66272 12.8458C6.33019 13.0558 5.98722 13.2709 5.64296 13.4965C5.81248 13.9855 6.03026 14.5059 6.31454 15.047C6.72531 14.7732 7.1426 14.5111 7.55077 14.2542C9.58768 12.971 11.3468 11.8626 11.3468 10.1034C11.3455 7.98306 9.62158 6.25781 7.49991 6.25781Z" fill="#D62828" />
                                    <path d="M4.23503 14.4766C2.36765 15.8954 0.759766 17.7158 0.759766 20.4191C0.759766 20.8781 1.13272 21.251 1.59174 21.251C2.05076 21.251 2.42372 20.8781 2.42372 20.4191C2.42372 18.5465 3.53085 17.1707 4.95486 16.0271C4.66406 15.4937 4.42673 14.9734 4.23503 14.4766Z" fill="#D62828" />
                                </svg>

                            </span>
                        </div>
                        <h3 className="uppercase text-neutral-dark text-sm lg:text-lg font-bold">Servicios</h3>
                    </div>
                    <h2 className="text-4xl lg:text-[52px]  font-medium mb-6 leading-tight italic">
                        <TextWithHighlight text={data?.title} split_coma={true} />

                    </h2>
                    <p className="mt-4 text-lg text-neutral max-w-3xl mx-auto">
                        {data?.description}
                    </p>
                </div>

                {/* MOBILE: Swiper para servicios */}
                <div className="block lg:hidden mb-8 w-full">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1.3}
                        centeredSlides={true}
                        initialSlide={1}
                        loop={true}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        className="w-full mx-auto"
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: {
                                slidesPerView: 3.3,
                                centeredSlides: true,
                            },
                        }}
                    >
                        {allServices.map((service, idx) => (
                            <SwiperSlide key={idx} className='overflow-hidden !rounded-lg'>
                                {({ isActive, isDuplicate }) => (
                                    <ServiceCard
                                        {...service}
                                        active={isActive && !isDuplicate && window.innerWidth < 1024}
                                    />
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* Paginación tipo dots */}
                    {/*  <div className="flex justify-center mt-4 gap-2 px-[5%]">
                        {allServices.map((_, idx) => (
                            <button
                                key={idx}
                                className={`w-3 h-3 rounded-full ${activeIndex === idx ? 'bg-accent' : 'bg-neutral'} transition-all`}
                                onClick={() => setActiveIndex(idx)}
                                aria-label={`Ir al servicio ${idx + 1}`}
                            />
                        ))}
                    </div> */}
                </div>

                {/* MOBILE: Card de RR.HH debajo del swiper */}
                <div className="block lg:hidden mb-8 px-[5%]">
                    <DynamicAd
                        correlative="home_services_mobile"
                        className="h-[350px]"
                        showWhatsAppButton={true}
                        fallbackContent={
                            // Contenido por defecto si no hay anuncio configurado
                            <div
                                className={`relative font-paragraph rounded-lg shadow-xl overflow-hidden flex flex-col h-[350px] transition-all duration-300 z-10`}
                            >
                                <div
                                    className="absolute inset-0 transition-opacity duration-300 pointer-events-none "
                                    style={{
                                        background: "linear-gradient(to top, rgba(0,0,0), #ffffff)"
                                    }}
                                />
                                <img
                                    src={"assets/cambiogerencia/card-contact.webp"}
                                    alt={"Servicios de RR.HH"}
                                    className="w-full h-full object-cover z-10 relative group-hover:opacity-0 transition-opacity duration-300"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/cccccc/808080?text=Imagen+no+disponible"; }}
                                />
                                <div className="p-6 flex flex-col flex-grow z-20 absolute bottom-0 text-white">
                                    <h3 className={`text-xl font-medium mb-2 `}>Servicios de RR.HH</h3>
                                    <p className={`text-xs mb-4 flex-grow text-white`}>Herramientas ágiles para la gestión del talent, enean commodo ligula eget dolor. </p>
                                    <WhatsAppButtonWithArrow variant="constrast" className="bg-constrast flex items-center gap-2 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out text-sm sm:text-base">
                                        Reserva una consulta
                                    </WhatsAppButtonWithArrow>
                                </div>
                            </div>
                        }
                    />
                </div>

                {/* DESKTOP: Grids como antes */}
                <div className="hidden px-[5%] mx-auto lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {servicesRow1.map((service, index) => (
                        <ServiceCard
                            key={index}
                            name={service.name}
                            description={service.description}
                            image={service.image}
                            slug={service.slug}
                        />
                    ))}
                    <DynamicAd
                        correlative="home_services_desktop"
                        className="h-[350px]"
                        showWhatsAppButton={true}
                        fallbackContent={
                            // Contenido por defecto si no hay anuncio configurado
                            <div
                                className={`relative h-[350px] font-paragraph rounded-lg shadow-xl overflow-hidden flex flex-col  transition-all duration-300 z-10`}
                            >
                                <div
                                    className="absolute inset-0 transition-opacity duration-300 pointer-events-none "
                                    style={{
                                        background: "linear-gradient(to top, rgba(0,0,0), #ffffff)"
                                    }}
                                />
                                <img
                                    src={"assets/cambiogerencia/card-contact.webp"}
                                    alt={"Servicios de RR.HH"}
                                    className="w-full h-full object-cover z-10 relative group-hover:opacity-0 transition-opacity duration-300"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/cccccc/808080?text=Imagen+no+disponible"; }}
                                />
                                <div className="p-6 flex flex-col flex-grow z-20  absolute bottom-0 text-white">
                                    <h3 className={`text-xl font-medium mb-2 `}>Servicios de RR.HH</h3>
                                    <p className={`text-xs mb-4 flex-grow  text-white`}>Herramientas ágiles para la gestión del talent, enean commodo ligula eget dolor. </p>
                                    <WhatsAppButtonWithArrow variant="constrast" className="bg-constrast flex items-center gap-2 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-primary transition duration-300 ease-in-out text-sm sm:text-base">
                                        Reserva una consulta
                                    </WhatsAppButtonWithArrow>
                                </div>
                            </div>
                        }
                    />
                </div>

                <div className="hidden  px-[5%] mx-auto lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {servicesRow2.map((service, index) => (
                        <ServiceCard
                            key={index}
                            name={service.name}
                            description={service.description}
                            image={service.image}
                            slug={service.slug}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeSeccionServicios;
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import TextWithHighlight from "./Utils/TextWithHighlight";
import ModalAppointment from "./components/Appointment/ModalAppointment";
import DynamicGalleryServiceService from "./DynamicGalleryService";
import { useTranslation } from "./hooks/useTranslation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ServiceSeccionHero from "./components/Tailwind/CambioGerencia/ServiceSeccionHero";
import ServiceSeccionEnfoque from "./components/Tailwind/CambioGerencia/ServiceSeccionEnfoque";
import ServiceSeccionBeneficio from "./components/Tailwind/CambioGerencia/ServiceSeccionBeneficio";
import ServiceSeccionMetodologia from "./components/Tailwind/CambioGerencia/ServiceSeccionMetodologia";
import ServiceSeccionFaq from "./components/Tailwind/CambioGerencia/ServiceSeccionFaq";
import HomeSeccionTestimonios from "./components/Tailwind/CambioGerencia/HomeSeccionTestimonios";
import CarruselBrands from "./components/Tailwind/Carrusel/CarruselBrands";

const DetailService = ({
    landing,
    services,
    allServices,
    linkWhatsApp,
    randomImage,
    brands,
    testimonios,
    casosExito,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showServicesMenu, setShowServicesMenu] = useState(false);
    const titleRef = useRef(null);
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "/api/cover/thumbnail/null";
    };

    const handleServicesMenu = () => {
        setShowServicesMenu(!showServicesMenu);
    };

    // Animaciones
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };
    // Animación del botón (igual a tu versión)
    const buttonVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
            },
        },
        pulse: {
            scale: [1, 1.05, 1],
            transition: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
            },
        },
        hover: {
            scale: 1.1,
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <div className="font-poppins">
            <Header
                lenghtServices={allServices?.length}
                lenghtCasos={casosExito?.length}
            />
            <ServiceSeccionHero service={services} />
            <ServiceSeccionEnfoque service={services} />
            <ServiceSeccionBeneficio service={services} />
            <ServiceSeccionMetodologia service={services} />
            <ServiceSeccionFaq faqs={services?.faqs} />
            <HomeSeccionTestimonios
                data={landing}
                bg_color="bg-neutral-light"
                testimonios={testimonios}
            />
            <CarruselBrands
                items={brands}
                data={{
                    title: "15,000+ empresas, desde pequeñas startups hasta nombres conocidos...",
                }}
            />
            <Footer />
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <DetailService {...properties} />
            </Base>
        </CarritoProvider>,
    );
});

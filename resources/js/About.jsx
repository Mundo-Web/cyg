import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import { useTranslation } from "./hooks/useTranslation";
import { AnimatePresence, motion } from "framer-motion";
import TextWithHighlight from "./Utils/TextWithHighlight";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HomeSeccionNosotros from "./components/Tailwind/CambioGerencia/HomeSeccionNosotros";
import AboutSeccionVision from "./components/Tailwind/CambioGerencia/AboutSeccionVision";
import AboutSeccionWhy from "./components/Tailwind/CambioGerencia/AboutSeccionWhy";
import CarruselBrands from "./components/Tailwind/Carrusel/CarruselBrands";
import AboutSeccionStaff from "./components/Tailwind/CambioGerencia/AboutSeccionStaff";

const AboutUs = ({
    aboutus,
    landing,
    brands,
    strengths,
    core_values,
    staff = [],
    casosExito = [],
    allServices = [],
}) => {
    const mision = aboutus?.find((item) => item.correlative === "mision");
    const vision = aboutus?.find((item) => item.correlative === "vision");
    const valor = aboutus?.find((item) => item.correlative === "valor");

    const beneficios_clave = aboutus?.find(
        (item) => item.correlative === "beneficios_clave",
    );

    const landingNosotros = landing?.find(
        (item) => item.correlative === "page_aboutus_nosotros",
    );
    const landingVision = landing?.find(
        (item) => item.correlative === "page_aboutus_vision",
    );

    const landingEligenos = landing?.find(
        (item) => item.correlative === "page_aboutus_eligenos",
    );

    return (
        <>
            <Header />

            <HomeSeccionNosotros
                data={landingNosotros}
                strengths={strengths}
                button_about={false}
            />
            <AboutSeccionVision
                data={landingVision}
                vision={vision}
                mision={mision}
                valor={valor}
            />
            <AboutSeccionWhy
                data={landingEligenos}
                beneficios_clave={beneficios_clave}
                core_values={core_values}
            />
            <AboutSeccionStaff staff={staff} />
            <CarruselBrands
                items={brands}
                data={{
                    title: "+100 empresas y entidades públicas, confían en nosotros...",
                }}
            />

            <Footer />
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <AboutUs {...properties} />
            </Base>
        </CarritoProvider>,
    );
});

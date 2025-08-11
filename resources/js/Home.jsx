import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";

import Header from "./components/Tailwind/Header";

import Footer from "./components/Tailwind/Footer";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import ItemsRest from "./actions/ItemRest";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import HealthSection from "./components/Home/HealthSection";
import TratamientoSection from "./components/Home/TratamientoSection";
import TestimonioSection from "./components/Home/TestimonioSection";
import AcercaDe from "./components/Home/AcercaDe";
import TextWithHighlight from "./Utils/TextWithHighlight";
import ReactModal from "react-modal";
import { X } from "lucide-react";
import ModalAppointment from "./components/Appointment/ModalAppointment";

import { motion } from "framer-motion";
import { ScrollAnimation } from "./animations/ScrollAnimation";
import { scrollEffects } from "./animations/animationVariantsSccroll";
import { PersistentScrollAnimation } from "./animations/PersistentScrollAnimation";
import BlurText from "./Utils/BlurText";
import { useTranslation } from "./hooks/useTranslation";
import SliderInteractive from "./components/Tailwind/Sliders/SliderInteractive";
import CarruselBrands from "./components/Tailwind/Carrusel/CarruselBrands";
import HomeSeccionNosotros from "./components/Tailwind/CambioGerencia/HomeSeccionNosotros";
import HomeSeccionImpacto from "./components/Tailwind/CambioGerencia/HomeSeccionImpacto";
import HomeSeccionServicios from "./components/Tailwind/CambioGerencia/HomeSeccionServicios";
import HomeSeccionTestimonios from "./components/Tailwind/CambioGerencia/HomeSeccionTestimonios";
import HomeSeccionBlog from "./components/Tailwind/CambioGerencia/HomeSeccionBlog";


// Animaciones para textos (en loop)
const textVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
    loop: {
        y: [0, -5, 0], // Movimiento sutil arriba/abajo
        transition: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 3,
            ease: "easeInOut",
        },
    },
};

// Animación para el resaltado de texto
const highlightVariants = {
    visible: {
        color: "#224483",
        scale: 1.05,
        transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 2.5,
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

ReactModal.setAppElement("#app");

const Home = ({
    linkWhatsApp,
    randomImage,
    showSlogan = true,
  
    landing,

    sliders,
    brands,
    posts= [],

    strengths= [],
    testimonios= [],
    indicators= [],
    allServices= [],
}) => {
    console.log("Home component loaded",allServices);
    const { t, loading, error } = useTranslation();
    const tipoSlider = "nopain";
    const landingNosotros = landing?.find(
        (item) => item.correlative === "page_home_nosotros"
    );

    const landingServicios = landing?.find(
        (item) => item.correlative === "page_home_servicios"
    );

    const landingImpacto = landing?.find(
        (item) => item.correlative === "page_home_impacto"
    );
    const landingTestimonios = landing?.find(
        (item) => item.correlative === "page_home_testimonios"
    );
    const landingBlog = landing?.find(
        (item) => item.correlative === "page_home_blog"
    );
   
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };
    const handleEnded = () => {
        setIsPlaying(false); // Mostrar el botón otra vez
    };

    const [isModalOpen, setIsModalOpen] = useState(false);


    const [allowSync, setAllowSync] = useState(false);
    const [slidesPerView, setSlidesPerView] = useState(4);
    const topSwiperRef = useRef(null);
    const bottomSwiperRef = useRef(null);
  
    // Función para determinar el número de slides por vista según el ancho de la pantalla
    const getCurrentSlidesPerView = () => {
      const width = window.innerWidth;
      if (width >= 1450) return 5;
      if (width >= 1150) return 4;
      if (width >= 950) return 3;
      if (width >= 650) return 2;
      return 1;
    };

    useEffect(() => {
        const handleResize = () => {
          const newSlidesPerView = getCurrentSlidesPerView();
          if (newSlidesPerView !== slidesPerView) {
            setSlidesPerView(newSlidesPerView);
          }
        };
    
        // Establecer el valor inicial
        setSlidesPerView(getCurrentSlidesPerView());
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [slidesPerView]);
    
      // Función para sincronizar los carruseles
      const syncSwipers = (sourceSwiper, targetSwiper) => {
        if (!allowSync || !sourceSwiper || !targetSwiper) return;
        
        const totalSlides = sourceSwiper.slides.length;
        const activeIndex = sourceSwiper.activeIndex;
        const currentSlidesPerView = sourceSwiper.params.slidesPerView;
        
        // Calculamos la posición correspondiente en el otro carrusel
        let targetIndex = totalSlides - activeIndex - currentSlidesPerView;
        
        // Aseguramos que el índice esté dentro de los límites
        targetIndex = Math.max(0, Math.min(targetIndex, totalSlides - currentSlidesPerView));
        
        // Movemos el carrusel objetivo sin disparar eventos
        setAllowSync(false);
        targetSwiper.slideTo(targetIndex, sourceSwiper.params.speed, false);
        setTimeout(() => {
          setAllowSync(true);
        }, sourceSwiper.params.speed + 50);
      };

      const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "/api/cover/thumbnail/null";
      };

      const swiperRef = useRef(null);

      const ArrowIcon = () => (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
          <mask id="mask0_226_5036" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
            <rect y="0.984375" width="20" height="20" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_226_5036)">
            <path d="M13.4791 11.8203H3.33325V10.1536H13.4791L8.81242 5.48698L9.99992 4.32031L16.6666 10.987L9.99992 17.6536L8.81242 16.487L13.4791 11.8203Z" fill="#7D3CB5"/>
          </g>
        </svg>
      );

   
   
    return (
        <div>
            <Header showSlogan={showSlogan}></Header>

            {/* SLIDER*/}
            <SliderInteractive
                items={sliders}
                data={{
                    infiniteLoop: "si",
                    paginationAlignment: "center",
                    showNavigation: "no",
                    navigationAlignment: "center"
                }}
            />
        <CarruselBrands items={brands} data={{ title: "15,000+ empresas, desde pequeñas startups hasta nombres conocidos..." }} />

{/*SECCION NOSOTROS */}

        <HomeSeccionNosotros data={landingNosotros} strengths={strengths}/>
        {/*SECCION SERVICIOS */}
        <HomeSeccionServicios data={landingServicios} allServices={allServices}/>
        <HomeSeccionImpacto data={landingImpacto} indicators={indicators}/>
        <HomeSeccionTestimonios data={landingTestimonios} testimonios={testimonios}/>
        <HomeSeccionBlog data={landingBlog} posts={posts}/>


            <Footer />
            {/* Modal */}
            <ModalAppointment
                linkWhatsApp={linkWhatsApp}
                randomImage={randomImage}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <Home {...properties} />
            </Base>
        </CarritoProvider>
    );
});

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Tippy from "@tippyjs/react";
import HtmlContent from "../../Utils/HtmlContent";
import GeneralRest from "../../actions/GeneralRest";
import { Send } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import Swal from "sweetalert2";
import SubscriptionsRest from "../../Actions/SubscriptionsRest";
import Global from "../../Utils/Global";



const Footer = ({ terms, footerLinks = [] }) => {
    const { t } = useTranslation();
    const generalRest = new GeneralRest();
    
    // Configurar notificaciones para GeneralRest (principalmente para consistencia)
    // Las consultas GET normalmente solo muestran errores, no éxitos
    generalRest.enableNotifications = false;
    const links = {};
    /* footerLinks.forEach((fl) => {
        links[fl.correlative] = fl.description;
    });*/
    const [socials, setSocials] = useState([]);

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const data = await generalRest.getSocials();
                setSocials(data);
            } catch (error) {
                console.error("Error fetching socials:", error);
            }
        };

        fetchSocials();
    }, []); // Asegúrate de que este array de dependencias está vacío si solo se ejecuta una vez

    const Facebook = socials.find(
        (social) => social.description === "Facebook"
    );
    const Twitter = socials.find((social) => social.description === "Twitter");
    const Instagram = socials.find(
        (social) => social.description === "Instagram"
    );
    const Youtube = socials.find((social) => social.description === "Youtube");
    const Tiktok = socials.find((social) => social.description === "Tiktok");
    const Whatsapp = socials.find((social) => social.description === "WhatsApp");

    const [aboutuses, setAboutuses] = useState(null); // o useState({});

    useEffect(() => {
        const fetchAboutuses = async () => {
            try {
                const data = await generalRest.getAboutuses();
                setAboutuses(data);
            } catch (error) {
                console.error("Error fetching about:", error);
            }
        };

        fetchAboutuses();
    }, []);

    const aboutusData = aboutuses?.aboutus || [];
    const generalsData = aboutuses?.generals || [];
    const sedesData = aboutuses?.sedes || [];
    // console.log(sedesData);
    const policyItems = {
        privacy_policy: t("public.footer.privacity", "Políticas de privacidad"),
        terms_conditions: t("public.form.terms", "Términos y condiciones"),
        // 'delivery_policy': 'Políticas de envío',
        exchange_policy: t("public.footer.change", "Políticas de cambio"),
    };

    const cleanText = (text) => {
        if (text === null || text === undefined) return "";

        // Convertir a string y eliminar varios patrones de asteriscos
        return String(text)
            .replace(/\*\*(.*?)\*\*/g, "$1") // **texto**
            .replace(/\*(.*?)\*/g, "$1") // *texto*
            .replace(/[*]+/g, ""); // Cualquier asterisco suelto
    };
    const subscriptionsRest = new SubscriptionsRest();
    
    // Deshabilitar notificaciones automáticas para usar SweetAlert personalizado
    // Esto permite mostrar mensajes más amigables y consistentes con el diseño
    subscriptionsRest.enableNotifications = false;
    
    const emailRef = useRef();


    const [saving, setSaving] = useState(false);

    // Función para limpiar el formulario de suscripción
    const clearEmailForm = () => {
        if (emailRef.current) {
            emailRef.current.value = "";
            // Pequeña animación de limpieza
            emailRef.current.style.transform = 'scale(0.98)';
            setTimeout(() => {
                emailRef.current.style.transform = 'scale(1)';
            }, 100);
        }
    };

    const onEmailSubmit = async (e) => {
        e.preventDefault();
        if (saving) return; // Prevenir múltiples envíos
        setSaving(true);

        const request = {
            email: emailRef.current.value,
            status: 1,
        };
        
        const result = await subscriptionsRest.save(request);
        setSaving(false);

        if (!result) {
            // Mostrar error personalizado
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al procesar tu suscripción. Por favor, inténtalo de nuevo.",
                icon: "error",
                confirmButtonText: "Entendido",
                confirmButtonColor: "#d33"
            });
            return;
        }

        // Mostrar éxito personalizado
        Swal.fire({
            title: "¡Éxito!",
            text: `Te has suscrito correctamente al blog de ${Global.APP_NAME}.`,
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#10b981",
            timer: 4000,
            timerProgressBar: true
        });

        // Limpiar el campo del email
        clearEmailForm();
    };


    return (
        <>
            <footer className="bg-primary">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:justify-center w-full px-[5%] py-10 md:py-16 text-white">
                    {/* Columna 1 - Logo y descripción */}
                    <div className="lg:col-span-2 flex flex-col gap-3 max-w-sm justify-between">
                        <a href="/">
                            <img
                                className="min-w-40 w-40"
                                src="/assets/img/logo-white.png"
                                alt="Sedna Logo"
                            />
                        </a>
                        {/*SUBCRIBE FORM*/}
                        <div className="mt-6 font-paragraph">
                            <h3 className="text-sm font-medium mb-4">Suscríbete y recibe todas nuestras novedades</h3>
                              <form onSubmit={onEmailSubmit}>
                            <div className="flex flex-row rounded-lg lg:justify-between py-2 lg:px-2  border  border-white bg-transparent">
                              
                                    <input
                                        ref={emailRef}
                                        disabled={saving}
                                        type="email"
                                        placeholder="Ingresa tu e-mail"
                                        className="px-4 w-7/12 lg:w-full py-2 bg-transparent text-white focus:outline-none transition-all duration-200"
                                        style={{ 
                                            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                            boxShadow: 'none'
                                        }}
                                      
                                        onBlur={(e) => {
                                            e.target.style.boxShadow = 'none';
                                            e.target.style.transform = 'scale(1)';
                                        }}
                                    />

                                    <button 
                                        disabled={saving} 
                                        className="bg-accent text-sm lg:text-base text-white px-4 rounded-md py-2 flex items-center justify-center transition-all duration-200 hover:bg-accent/90 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                        style={{ 
                                            transition: 'all 0.2s ease-in-out'
                                        }}
                                    >
                                        {saving ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                    />
                                                </svg>
                                                Enviando...
                                            </span>
                                        ) : (
                                            <>
                                                Suscribirme <Send className="ml-2 transition-transform duration-200 group-hover:translate-x-1" size={16} />
                                            </>
                                        )}
                                    </button>
                               
                            </div> </form>
                        </div>
                    </div>

                    {/* Columna 2 - Sobre Sedna */}
                    <div className="hidden lg:flex flex-col gap-2 font-paragraph text-[15px]">

                    </div>

                    <div className="lg:col-span-2 grid grid-cols-2 gap-8 lg:gap-4">
                        {/* Columna 3 - Portafolio */}
                        <div className="flex flex-col gap-2 font-paragraph text-sm lg:text-[15px]">
                            <h3 className="  font-title font-bold mb-3">
                                Ubícanos
                            </h3>
                            <p className="cursor-pointer">
                                {generalsData.find(item => item.correlative === "address")?.description || ""}
                            </p>
                            <p className="cursor-pointer">
                                Teléfono: {generalsData.find(item => item.correlative === "support_phone")?.description || ""}
                            </p>
                            <p className="cursor-pointer ">
                                Correo:
                                <span className="block line-clamp-1">  {generalsData.find(item => item.correlative === "support_email")?.description || "Lima, Perú"}
                               </span>
                            </p>
                        </div>

                        {/* Columna 4 - Soporte */}
                        <div className="flex flex-col gap-2 font-paragraph text-sm lg:text-[15px]">
                            <h3 className="text-base  font-title font-bold mb-3">
                                Políticas
                            </h3>
                            <a href="/politicas-de-privacidad" className="cursor-pointer hover:text-accent transition-colors duration-200">
                                Políticas de privacidad
                            </a>
                            <a href="/terminos-y-condiciones" className="cursor-pointer hover:text-accent transition-colors duration-200">
                                Términos y Condiciones
                            </a>
                            <a href="/politicas-de-cambio" className="cursor-pointer hover:text-accent transition-colors duration-200">
                                Políticas de cambio
                            </a>
                            <a href="/libro-de-reclamaciones" className="cursor-pointer">
                                Libro de reclamaciones
                            </a>

                        </div>
                        <div className="flex flex-col gap-2 font-paragraph text-sm lg:text-[15px]">
                            <h3 className="text-base  font-title font-bold mb-3">
                                Horario de atención
                            </h3>
                            <p className="cursor-pointer">
                                {generalsData.find(item => item.correlative === "opening_hours")?.description || "Lima, Perú"}
                               
                            </p>

                        </div>
                        <div className="flex flex-col gap-2 font-paragraph text-sm lg:text-[15px]">
                            <h3 className="text-base  font-title font-bold mb-3">
                                Nuestras redes
                            </h3>
                            <div className="flex flex-row gap-5 text-white mt-3">

                                {Facebook && (
                                    <a
                                        href={Facebook.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >

                                        <i className="fa-brands fa-facebook fa-xl"></i>
                                    </a>
                                )}

                                {Tiktok && (
                                    <a
                                        href={Tiktok.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fa-brands fa-tiktok fa-xl"></i>
                                    </a>
                                )}

                                {Instagram && (
                                    <a
                                        href={Instagram.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fa-brands fa-instagram fa-xl"></i>
                                    </a>
                                )}

                                {/* {datosgenerales?.linkedin && (
                                <a
                                    href={datosgenerales.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa-brands fa-linkedin fa-xl"></i>
                                </a>
                            )} */}

                                {Twitter && (
                                    <a
                                        href={Twitter.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fa-brands fa-twitter fa-xl"></i>
                                    </a>
                                )}

                                {Youtube && (
                                    <a
                                        href={Youtube.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fa-brands fa-youtube fa-xl"></i>
                                    </a>
                                )}

                                {Whatsapp && (
                                    <a
                                        href={Whatsapp.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fa-brands fa-whatsapp fa-xl"></i>
                                    </a>
                                )}
                            </div>

                        </div>

                    </div>
                </div>
                    {Whatsapp && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex justify-end w-full mx-auto z-[100] relative"
                        >
                            <div className="fixed bottom-3 right-2 md:bottom-[1rem] lg:bottom-[2rem] lg:right-3 z-20 cursor-pointer">
                                <a
                                    target="_blank"
                                    id="whatsapp-toggle"
                                    href={Whatsapp.link}
                                >
                                    <motion.img
                                        animate={{
                                            y: [0, -10, 0],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatType: "loop",
                                        }}
                                        src="/assets/img/icons/WhatsApp.svg"
                                        alt="whatsapp"
                                        className="mr-3 w-16 h-16 md:w-[80px] md:h-[80px]"
                                    />
                                </a>
                            </div>
                        </motion.div>
                    )}
                <div className="bg-neutral-light text-primary py-3 flex items-center justify-center">
                    <div className="text-center gap-5 w-full px-[5%] font-paragraph font-medium text-[10px] lg:text-sm">
                        Copyright <span className="text-accent">©</span> 2025 Cambio & Gerencia. Reservados todos los derechos.
                        {/*  <div className="flex flex-row gap-4">
                            <a
                                onClick={() => openModal(0)}
                                className="cursor-pointer"
                            >
                                {t("public.footer.privacy", "Privacidad")}
                            </a>
                            <a
                                onClick={() => openModal(1)}
                                className="cursor-pointer"
                            >
                                {t("public.footer.terms", "Condiciones de uso")}
                            </a>
                        </div>*/}
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;

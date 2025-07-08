import React, { useState, useEffect } from "react";
import WhatsAppButton from "./WhatsAppButton";

const DynamicAd = ({ 
    correlative, 
    className = "",
    fallbackContent = null,
    onAdLoad = null,
    showWhatsAppButton = false 
}) => {
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAd = async () => {
            if (!correlative) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`/api/ads/by-correlative/${correlative}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setAd(data);
                    if (onAdLoad) onAdLoad(data);
                } else if (response.status === 404) {
                    // No hay anuncio para este correlativo
                    setAd(null);
                } else {
                    throw new Error('Error al cargar el anuncio');
                }
            } catch (err) {
                console.error('Error fetching ad:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAd();
    }, [correlative, onAdLoad]);

    const handleAdClick = () => {
        if (ad?.link) {
            window.open(ad.link, '_blank');
        }
    };

    if (loading) {
        return (
            <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`}>
                <div className="h-full flex items-center justify-center">
                    <span className="text-gray-500">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error || !ad) {
        return fallbackContent || null;
    }

    return (
        <div className={`relative font-paragraph rounded-lg shadow-xl overflow-hidden flex flex-col transition-all duration-300 z-10 ${className}`}>
            {/* Overlay gradiente si hay texto superpuesto */}
            {(ad.name || ad.description) && (
                <div
                    className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
                    }}
                />
            )}
            
            {/* Imagen del anuncio */}
            <img
                src={ad.image ? `/api/ads/media/${ad.image}` : "/assets/img/placeholder.png"}
                alt={ad.name || "Anuncio"}
                className="w-full h-full object-cover cursor-pointer"
                onClick={handleAdClick}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400/cccccc/808080?text=Imagen+no+disponible";
                }}
            />
            
            {/* Contenido superpuesto */}
            {(ad.name || ad.description || showWhatsAppButton) && (
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                    {ad.name && (
                        <h3 className="text-xl font-medium mb-2">
                            {ad.name}
                        </h3>
                    )}
                    
                    {ad.description && (
                        <p className="text-sm mb-4 opacity-90">
                            {ad.description}
                        </p>
                    )}
                    
                    {showWhatsAppButton && ad.whatsapp_message && (
                        <WhatsAppButton
                            variant="constrast"
                            className="bg-constrast flex items-center gap-2 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out text-sm sm:text-base w-full justify-center"
                            customMessage={ad.whatsapp_message}
                        >
                            Más información
                        </WhatsAppButton>
                    )}
                    
                    {ad.link && !showWhatsAppButton && (
                        <button
                            onClick={handleAdClick}
                            className="bg-constrast text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out text-sm sm:text-base w-full"
                        >
                            Ver más
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default DynamicAd;

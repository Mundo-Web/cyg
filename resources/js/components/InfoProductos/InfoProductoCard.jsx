import React from "react";
import WhatsAppButton from "../Shared/WhatsAppButton";

const InfoProductoCard = ({ name, summary, image, collaborator, info_date }) => {
    // Formatear fecha
    const fecha = info_date ? new Date(info_date).toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" }) : "";
    
    // Crear mensaje personalizado para WhatsApp
    const whatsappMessage = `Hola, me interesa obtener más información sobre el infoproducto "${name}".

📄 *Resumen:* ${summary}
👨‍💼 *Colaborador:* ${collaborator}
📅 *Fecha:* ${fecha}

¿Podrían brindarme más detalles al respecto?`;

    return (
        <div className=" rounded-lg overflow-hidden flex flex-col h-full text-paragraph">
            <img
                src={image ? `/api/infoproducts/media/${image}` : "/assets/img/placeholder.png"}
                alt={name}
                className="w-full aspect-[4/3] object-cover object-center rounded-lg"
            />
            <div className="flex-1 flex flex-col p-6">
                <h2 className="text-2xl font-medium text-neutral mb-2 leading-tight">
                    {name}
                </h2>
                <p className="text-neutral text-base mb-4 flex-1">
                    {summary}
                </p>
                <div className="flex justify-between items-end text-sm mt-4">
                    <div>
                        <span className="block text-accent font-semibold">Colaborador</span>
                        <span className="block text-neutral">{collaborator}</span>
                    </div>
                    <div className="text-right">
                        <span className="block text-accent font-semibold">Fecha</span>
                        <span className="block text-neutral">{fecha}</span>
                    </div>
                </div>
                <WhatsAppButton 
                    variant="constrast"
                    className="mt-6 w-full bg-constrast text-white font-semibold py-3 rounded-xl transition-colors hover:bg-red-600"
                    customMessage={whatsappMessage}
                    showIcon={false}
                >
                    Más información
                </WhatsAppButton>
            </div>
        </div>
    );
};

export default InfoProductoCard;

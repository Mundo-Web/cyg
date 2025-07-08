import React, { useState } from "react";
import WhatsAppButton from "../../Shared/WhatsAppButton";
import DynamicAd from "../../Shared/DynamicAd";



const DownIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#0090E3" /><path d="M8 10l4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const UpIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#D62828" /><path d="M16 14l-4-4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const ServiceSeccionFaq = ({ faqs = [] }) => {
  // Inicializamos openItems como un Set vacío para evitar errores
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    // Crear una nueva copia del Set para mantener la inmutabilidad
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  }
  return (<section className="w-full font-paragraph bg-white px-[5%] py-12 md:py-16 flex flex-col lg:flex-row gap-10 lg:gap-20 mx-auto">
    {/* FAQ */}
    <div className="flex-1 w-full lg:w-7/12">
      <h2 className="text-3xl md:text-4xl text-neutral-dark lg:text-[52px] font-medium mb-4 md:mb-6 leading-tight italic">
        Preguntas <span className="text-constrast">Frecuentes</span>
      </h2>
      <div className="space-y-4">
        {faqs.map((item) => (
          <div key={item.id} className="border border-neutral-light rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)} className={`w-full px-4 md:px-6 py-3 md:py-4 text-left transition-colors duration-200 flex items-center justify-between ${openItems.has(item.id) ? "bg-constrast text-white border-b" : "text-neutral-dark border-neutral-light bg-neutral-light"}`}
            >
              <span className="text-base md:text-lg font-medium pr-2 md:pr-4">{item.name}</span><div className="flex-shrink-0">
                {openItems.has(item.id) ? <UpIcon /> : <DownIcon />}
              </div>
            </button>                {openItems.has(item.id) && item.description && (<div className="px-4 md:px-6 py-4 md:py-6 bg-constrast text-white">
              <p className="text-sm md:text-base leading-relaxed">{item.description}</p>
            </div>
            )}
          </div>
        ))}
      </div>

    </div>
    {/* Card lateral */}      
    <div className="w-full max-w-xs mx-auto lg:mx-0">
      <DynamicAd 
        correlative="service_faq_sidebar"
        fallback={
          <div className="rounded-2xl overflow-hidden shadow-lg relative bg-white">
            <img
              src="/assets/cambiogerencia/card-contact-2.webp"
              alt="Servicios de RR.HH"
              className="w-full h-96 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 md:p-6">
              <h3 className="text-white text-lg md:text-xl font-medium mb-1 drop-shadow">Servicios de RR.HH</h3>
              <p className="text-white text-xs mb-3 md:mb-4 drop-shadow">Herramientas ágiles para la gestión del talent, enean commodo ligula eget dolor.</p>
              <WhatsAppButton
                variant="constrast"
                size="medium"
                className="bg-constrast text-white hover:bg-primary border-none"
                showIcon={true}
              >
                Reserva una consulta
              </WhatsAppButton>
            </div>
          </div>
        }
      />
    </div>
  </section>
  );
};

export default ServiceSeccionFaq;

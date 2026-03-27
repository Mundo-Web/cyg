import React from "react";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoProvider } from "./context/CarritoContext";
import { useTranslation } from "./hooks/useTranslation";
import HtmlContent from "./Utils/HtmlContent";

const ExchangePolicy = ({ generals }) => {
    const { t } = useTranslation();
    const content = generals?.find((x) => x.correlative === "exchange_policy")?.description ?? "";

    return (
        <>
            <Header />

            <main className="min-h-[60vh] bg-white">
                <section className="px-[5%] py-12 lg:py-20 max-w-5xl mx-auto">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
                            {t("public.footer.change", "Políticas de cambio")}
                        </h1>
                        <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
                        <HtmlContent className="prose prose-lg max-w-none text-gray-700" html={content} />
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties} showSlogan={false}>
                <ExchangePolicy {...properties} />
            </Base>
        </CarritoProvider>,
    );
});

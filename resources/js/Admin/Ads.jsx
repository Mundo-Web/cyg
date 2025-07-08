import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import CreateReactScript from "../Utils/CreateReactScript";
import Table from "../Components/Table";
import Modal from "../Components/Modal";
import InputFormGroup from "../Components/Adminto/form/InputFormGroup";
import ReactAppend from "../Utils/ReactAppend";
import DxButton from "../Components/dx/DxButton";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";
import Swal from "sweetalert2";
import AdsRest from "../Actions/Admin/AdsRest";
import { renderToString } from "react-dom/server";
import TextareaFormGroup from "../Components/Adminto/form/TextareaFormGroup";
import SelectFormGroup from "../Components/Adminto/form/SelectFormGroup";

const adsRest = new AdsRest();

const Ads = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const correlativeRef = useRef();
    const whatsappMessageRef = useRef();
    const [isEditing, setIsEditing] = useState(false);
    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        descriptionRef.current.value = data?.description ?? "";
        correlativeRef.current.value = data?.correlative ?? "";
        whatsappMessageRef.current.value = data?.whatsapp_message ?? "";
        imageRef.image.src = `/api/ads/media/${data?.image}`;
        imageRef.current.value = null;
        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();
        try {
            const request = {
                id: idRef.current.value || undefined,
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                correlative: correlativeRef.current.value,
                whatsapp_message: whatsappMessageRef.current.value,
                visible: 1, // Por defecto visible
                invasivo: 0, // Por defecto no invasivo
                actions: 0, // Por defecto no requiere acción
                seconds: 0, // Por defecto sin delay
            };

            const formData = new FormData();
            for (const key in request) {
                formData.append(key, request[key]);
            }
            const file = imageRef.current.files[0];
            if (file) {
                formData.append("image", file);
            }

            const result = await adsRest.save(formData);
            console.log(result);
            if (!result) return;

            console.log("Refrescando tabla...");
            $(gridRef.current).dxDataGrid("instance").refresh();

            console.log("Cerrando modal...");
            $(modalRef.current).modal("hide");
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.",
            });
        }
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await adsRest.boolean({ id, field: "visible", value });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar anuncio",
            text: "¿Estás seguro de eliminar este anuncio?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await adsRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Anuncios"
                rest={adsRest}
                toolBar={(container) => {
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "refresh",
                            hint: "Refrescar tabla",
                            onClick: () =>
                                $(gridRef.current)
                                    .dxDataGrid("instance")
                                    .refresh(),
                        },
                    });
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "plus",
                            text: "Nuevo anuncio",
                            hint: "Nuevo anuncio",
                            onClick: () => onModalOpen(),
                        },
                    });
                }}
                columns={[
                    {
                        dataField: "id",
                        caption: "ID",
                        visible: false,
                    },
                    {
                        dataField: "image",
                        caption: "Imagen",
                        width: "80px",
                        allowFiltering: false,
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/api/ads/media/${data.image}`}
                                    style={{
                                        width: "70px",
                                        aspectRatio: 16/9,
                                        objectFit: "contain",
                                        objectPosition: "center",
                                        borderRadius: "4px",
                                        border: "1px solid #e3ebf0"
                                    }}
                                />
                            );
                        },
                    },
                    {
                        dataField: "correlative",
                        caption: "Sección",
                        width: "200px",
                        cellTemplate: (container, { data }) => {
                            const sectionNames = {
                                'home_services_mobile': 'Servicios - Móvil',
                                'home_services_desktop': 'Servicios - Escritorio',
                                'service_faq_sidebar': 'FAQ Servicios - Lateral',
                                'case_study_sidebar_desktop': 'Caso de Éxito - Sidebar Desktop',
                                'case_study_content_mobile': 'Caso de Éxito - Contenido Móvil',
                                'contact_banner': 'Banner de Contacto',
                                'footer_promotion': 'Promoción Footer',
                                'header_announcement': 'Anuncio Header',
                                'sidebar_ad': 'Anuncio Lateral'
                            };
                            const sectionName = sectionNames[data.correlative] || data.correlative || 'Sin sección';
                            container.html(
                                `<span class="badge bg-info">${sectionName}</span>`
                            );
                        },
                    },
                    {
                        dataField: "name",
                        caption: "Contenido",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <div>
                                    <p className="mb-1 fw-bold">{data.name || 'Sin título'}</p>
                                    {data.description && (
                                        <small className="text-muted d-block" style={{
                                            overflow: "hidden",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,
                                        }}>
                                            {data.description}
                                        </small>
                                    )}
                                    {data.whatsapp_message && (
                                        <small className="text-success">
                                            <i className="fab fa-whatsapp me-1"></i>
                                            Mensaje personalizado
                                        </small>
                                    )}
                                </div>
                            );
                        },
                    },
                    {
                        dataField: "visible",
                        caption: "Visible",
                        dataType: "boolean",
                        width: "120px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <SwitchFormGroup
                                    checked={data.visible}
                                    onChange={(e) =>
                                        onVisibleChange({
                                            id: data.id,
                                            value: e.target.checked,
                                        })
                                    }
                                />
                            );
                        },
                    },
                    {
                        caption: "Acciones",
                        width: "120px",
                        cellTemplate: (container, { data }) => {
                            container.css("text-overflow", "unset");
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-primary me-1",
                                    title: "Editar",
                                    icon: "fa fa-pen",
                                    onClick: () => onModalOpen(data),
                                })
                            );
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-danger",
                                    title: "Eliminar",
                                    icon: "fa fa-trash",
                                    onClick: () => onDeleteClicked(data.id),
                                })
                            );
                        },
                        allowFiltering: false,
                        allowExporting: false,
                    },
                ]}
            />
            <Modal
                modalRef={modalRef}
                title={isEditing ? "Editar anuncio" : "Agregar anuncio"}
                onSubmit={onModalSubmit}
                size="md"
            >
                <div className="row" id="principal-container">
                    <input ref={idRef} type="hidden" />
                    
                    <ImageFormGroup
                        eRef={imageRef}
                        label="Imagen"
                        col="col-md-12"
                        aspect={16/9}
                        fit="contain"
                        required
                    />
                    
                    <SelectFormGroup
                        eRef={correlativeRef}
                        label="Sección del sitio"
                        col="col-md-12"
                        dropdownParent={'#principal-container'}
                        required
                    >
                        <option value="">Selecciona una sección</option>
                        <option value="home_services_mobile">Servicios - Móvil</option>
                        <option value="home_services_desktop">Servicios - Escritorio</option>
                        <option value="service_faq_sidebar">FAQ Servicios - Lateral</option>
                        <option value="case_study_sidebar_desktop">Caso de Éxito - Sidebar Desktop</option>
                        <option value="case_study_content_mobile">Caso de Éxito - Contenido Móvil</option>
                        <option value="contact_banner">Banner de Contacto</option>
                        <option value="footer_promotion">Promoción Footer</option>
                        <option value="header_announcement">Anuncio Header</option>
                        <option value="sidebar_ad">Anuncio Lateral</option>
                    </SelectFormGroup>
                    
                    <InputFormGroup
                        eRef={nameRef}
                        label="Título del anuncio"
                        col="col-md-12"
                        placeholder="Ej: Descubre nuestros servicios"
                        required
                    />
                    
                    <TextareaFormGroup
                        eRef={descriptionRef}
                        label="Descripción"
                        col="col-md-12"
                        rows={3}
                        placeholder="Descripción del anuncio"
                    />
                    
                    <TextareaFormGroup
                        eRef={whatsappMessageRef}
                        label="Mensaje personalizado de WhatsApp"
                        col="col-md-12"
                        rows={3}
                        placeholder="Mensaje que se enviará al hacer clic en el anuncio (opcional)"
                    />
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Pop-ups">
            <Ads {...properties} />
        </BaseAdminto>
    );
});

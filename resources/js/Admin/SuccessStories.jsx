import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import BaseAdminto from "@Adminto/Base";
import { renderToString } from "react-dom/server";
import Swal from "sweetalert2";

import Modal from "../Components/Adminto/Modal";
import Table from "../Components/Adminto/Table";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";
import InputFormGroup from "../Components/Adminto/form/InputFormGroup";
import SelectAPIFormGroup from "../Components/Adminto/form/SelectAPIFormGroup";
import DxButton from "../Components/dx/DxButton";
import CreateReactScript from "../Utils/CreateReactScript";
import ReactAppend from "../Utils/ReactAppend";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import { LanguageProvider } from "../context/LanguageContext";
import DragDropImage from "../components/Adminto/form/DragDropImage";
import SetSelectValue from "../Utils/SetSelectValue";

import SuccessStoriesRest from "../actions/Admin/SuccessStoriesRest";

const successStoriesRest = new SuccessStoriesRest();
// Componente FeatureCard simplificado
const FeatureCard = ({
    feature,
    index,
    onUpdate,
    onRemove,
    type,
    canRemove,
    characteristics,
    benefits,
    addCharacteristic,
    addBenefit,

    addStep,
    steps,

    solutions,
    addSolution,
    challenges,
    addChallenge,
}) => {
    const handleFieldChange = (field, value) => {
        onUpdate(index, field, value);
    };

    const handleImageChange = (imageData) => {
        onUpdate(index, "image", imageData);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row">
                    {type === "solution" || type === "challenge" ? (
                        <div className="col-md-12">
                            <InputFormGroup
                                label="Título"
                                value={feature.title}
                                onChange={(e) =>
                                    handleFieldChange("title", e.target.value)
                                }
                            />
                        </div>
                    ) : (
                        <>
                            <div className="col-md-9">
                                <InputFormGroup
                                    label="Título"
                                    value={feature.title}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            "title",
                                            e.target.value,
                                        )
                                    }
                                />
                                <div className="mb-3">
                                    <label className="form-label">
                                        Descripción
                                    </label>
                                    <textarea
                                        className="form-control"
                                        rows={4}
                                        value={feature.description}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <DragDropImage
                                    current={"success_story"}
                                    label="Imagen"
                                    currentImage={feature.image}
                                    onChange={handleImageChange}
                                    aspect={1}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onRemove(index)}
                        disabled={!canRemove}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                    {(type === "characteristic" &&
                        index === characteristics.length - 1) ||
                    (type === "benefit" && index === benefits.length - 1) ||
                    (type === "step" && index === steps.length - 1) ||
                    (type === "challenge" && index === challenges.length - 1) ||
                    (type === "solution" && index === solutions.length - 1) ? (
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={
                                type === "characteristic"
                                    ? addCharacteristic
                                    : type === "benefit"
                                      ? addBenefit
                                      : type === "step"
                                        ? addStep
                                        : type === "challenge"
                                          ? addChallenge
                                          : addSolution
                            }
                        >
                            +{" "}
                            {type === "characteristic"
                                ? "Característica"
                                : type === "benefit"
                                  ? "Beneficio"
                                  : type === "step"
                                    ? "Paso"
                                    : type === "challenge"
                                      ? "Desafío"
                                      : "Solución"}
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
const SuccessStories = ({ brands }) => {
    const gridRef = useRef();
    const modalRef = useRef();

    const idRef = useRef();

    const nameRef = useRef();
    const summaryRef = useRef();
    const descriptionRef = useRef();

    const title_benefitsRef = useRef();
    const description_benefitsRef = useRef();

    const title_challengesRef = useRef();
    const description_challengesRef = useRef();

    const category_projectRef = useRef();
    const client_projectRef = useRef();
    const date_start_projectRef = useRef();
    const date_end_projectRef = useRef();
    const durationRef = useRef();

    const company_nameRef = useRef();
    const company_logoRef = useRef();
    const company_summaryRef = useRef();
    const company_percentageRef = useRef();
    const company_description_percentageRef = useRef();
    const servicesRef = useRef();

    const imageRef = useRef();
    const image_challengesRef = useRef();
    const [isEditing, setIsEditing] = useState(false);

    // Estados para desafíos y soluciones
    const [challenges, setChallenges] = useState([{ title: "" }]);

    const [solutions, setSolutions] = useState([{ title: "" }]);

    const [benefits, setBenefits] = useState([
        { title: "", description: "", image: undefined },
    ]);

    const [steps, setSteps] = useState([
        { title: "", description: "", image: undefined },
    ]);

    // Funciones para desafíos (simplificadas)
    const addChallenge = () => {
        setChallenges([
            ...challenges,
            {
                title: "",
                // description: "",
                // image: undefined,
            },
        ]);
    };

    const updateChallenge = useCallback((index, field, value) => {
        setChallenges((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }, []);

    const removeChallenge = (index) => {
        if (challenges.length <= 1) return;
        setChallenges(challenges.filter((_, i) => i !== index));
    };

    const addSolution = () => {
        setSolutions([
            ...solutions,
            {
                title: "",
                // description: "",
                // image: undefined,
            },
        ]);
    };
    const updateSolution = useCallback((index, field, value) => {
        setSolutions((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }, []);

    const removeSolution = (index) => {
        if (solutions.length <= 1) return;
        setSolutions(solutions.filter((_, i) => i !== index));
    };

    // Funciones para beneficios (simplificadas)
    const addBenefit = () => {
        setBenefits([
            ...benefits,
            {
                title: "",
                description: "",
                image: undefined,
            },
        ]);
    };
    const updateBenefit = useCallback((index, field, value) => {
        setBenefits((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }, []);

    const removeBenefit = (index) => {
        if (benefits.length <= 1) return;
        setBenefits(benefits.filter((_, i) => i !== index));
    };

    const addStep = () => {
        setSteps([
            ...steps,
            {
                title: "",
                description: "",
                image: undefined,
            },
        ]);
    };
    const updateStep = useCallback((index, field, value) => {
        setSteps((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }, []);

    const removeStep = (index) => {
        if (steps.length <= 1) return;
        setSteps(steps.filter((_, i) => i !== index));
    };

    const onModalOpen = async (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        summaryRef.current.value = data?.summary ?? "";

        descriptionRef.current.value = data?.description ?? "";

        title_benefitsRef.current.value = data?.title_benefits ?? "";
        description_benefitsRef.current.value =
            data?.description_benefits ?? "";

        title_challengesRef.current.value = data?.title_challenges ?? "";
        description_challengesRef.current.value =
            data?.description_challenges ?? "";

        category_projectRef.current.value = data?.category_project ?? "";
        client_projectRef.current.value = data?.client_project ?? "";
        date_start_projectRef.current.value = data?.date_start_project ?? "";
        date_end_projectRef.current.value = data?.date_end_project ?? "";
        durationRef.current.value = data?.duration ?? "";
        company_nameRef.current.value = data?.company_name ?? "";
        company_summaryRef.current.value = data?.company_summary ?? "";
        company_percentageRef.current.value = data?.company_percentage ?? "";
        company_description_percentageRef.current.value =
            data?.company_description_percentage ?? "";

        // Manejar servicios - obtener datos completos por IDs
        if (data?.services && data.services.length > 0) {
            try {
                let serviceIds = [];

                // Verificar si es un string separado por comas o un array
                if (typeof data.services === "string") {
                    // Si es string, dividir por comas y limpiar espacios
                    serviceIds = data.services
                        .split(",")
                        .map((id) => id.trim())
                        .filter((id) => id);
                } else if (Array.isArray(data.services)) {
                    // Si es array, extraer IDs si son objetos o usar directamente si son strings
                    serviceIds = data.services.map((service) =>
                        typeof service === "object" ? service.id : service,
                    );
                }

                console.log("Service IDs extraídos:", serviceIds);

                if (serviceIds.length > 0) {
                    const servicesToSet =
                        await successStoriesRest.getServicesByIds(serviceIds);
                    console.log("Servicios cargados:", servicesToSet);
                    SetSelectValue(
                        servicesRef.current,
                        servicesToSet,
                        "id",
                        "name",
                    );
                } else {
                    SetSelectValue(servicesRef.current, [], "id", "name");
                }
            } catch (error) {
                console.error("Error al cargar servicios:", error);
                // Fallback: si hay error, limpiar el select
                SetSelectValue(servicesRef.current, [], "id", "name");
            }
        } else {
            // Si no hay servicios, limpiar el select
            SetSelectValue(servicesRef.current, [], "id", "name");
        }

        // Manejo de imágenes como en el primer código
        imageRef.image.src = `/api/success_story/media/${data?.image ?? "undefined"}`;
        company_logoRef.image.src = `/api/success_story/media/${
            data?.company_logo ?? "undefined"
        }`;
        image_challengesRef.image.src = `/api/success_story/media/${
            data?.image_challenges ?? "undefined"
        }`;

        if (data?.benefits) {
            setBenefits(
                data.benefits.map((char) => ({
                    title: char.title,
                    description: char.description,
                    image: char.image, // Guardar directamente el string del nombre de archivo
                })),
            );
        }

        if (data?.challenges) {
            setChallenges(
                data.challenges.map((char) => ({
                    title: char.title,
                })),
            );
        }

        if (data?.solutions) {
            setSolutions(
                data.solutions.map((char) => ({
                    title: char.title,
                })),
            );
        }

        $(modalRef.current).modal("show");
    };

    // Enviar formulario - similar al primer código pero adaptado
    const onModalSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Campos básicos como en el primer código
        const request = {
            id: idRef.current.value || undefined,
            name: nameRef.current.value,
            summary: summaryRef.current.value,

            description: descriptionRef.current.value,

            title_challenges: title_challengesRef.current.value,
            description_challenges: description_challengesRef.current.value,

            title_benefits: title_benefitsRef.current.value,
            description_benefits: description_benefitsRef.current.value,

            category_project: category_projectRef.current.value,
            client_project: client_projectRef.current.value,
            date_start_project: date_start_projectRef.current.value,
            date_end_project: date_end_projectRef.current.value,
            duration: durationRef.current.value,
            company_name: company_nameRef.current.value,
            company_summary: company_summaryRef.current.value,
            company_percentage: company_percentageRef.current.value,
            company_description_percentage:
                company_description_percentageRef.current.value,
            services: $(servicesRef.current).val(),
        };

        // Añadir campos básicos al formData
        for (const key in request) {
            formData.append(key, request[key]);
        }

        // Añadir imágenes como en el primer código
        const image = imageRef.current.files[0];
        if (image) formData.append("image", image);
        const company_logo = company_logoRef.current.files[0];
        if (company_logo) formData.append("company_logo", company_logo);

        const image_challenges = image_challengesRef.current.files[0];
        if (image_challenges)
            formData.append("image_challenges", image_challenges);

        // Dentro de onModalSubmit, al procesar características
        /*  characteristics.forEach((char, index) => {
              formData.append(`characteristics[${index}][title]`, char.title);
  
          });
  */
        benefits.forEach((char, index) => {
            formData.append(`benefits[${index}][title]`, char.title);
            formData.append(
                `benefits[${index}][description]`,
                char.description,
            );

            if (char.image) {
                if (char.image.file) {
                    formData.append(
                        `benefits[${index}][image]`,
                        char.image.file,
                    );
                }
                // Si es una imagen existente (viene del servidor como string)
                else if (typeof char.image === "string") {
                    formData.append(
                        `benefits[${index}][existing_image]`,
                        char.image,
                    );
                }
            }
        });

        challenges.forEach((char, index) => {
            formData.append(`challenges[${index}][title]`, char.title);
        });
        solutions.forEach((char, index) => {
            formData.append(`solutions[${index}][title]`, char.title);
        });

        const result = await successStoriesRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

    const onBooleanChange = async ({ id, field, value }) => {
        const result = await successStoriesRest.boolean({ id, field, value });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar registro",
            text: "¿Estás seguro de eliminar este caso de éxito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await successStoriesRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };
    const onVisibleChange = async ({ id, value }) => {
        const result = await successStoriesRest.boolean({
            id,
            field: "visible",
            value,
        });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Casos de éxito"
                rest={successStoriesRest}
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
                            text: "Agregar",
                            hint: "Agregar nuevo Caso de éxtio",
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
                        dataField: "name",
                        caption: "Título",
                        width: "200px",
                    },
                    {
                        dataField: "description",
                        caption: "Descripción",
                        cellTemplate: (container, { data }) => {
                            container.html(
                                renderToString(
                                    <div
                                        className="text-truncate"
                                        style={{ maxWidth: "300px" }}
                                    >
                                        {data.description}
                                    </div>,
                                ),
                            );
                        },
                    },
                    {
                        dataField: "image",
                        caption: "Imagen",
                        width: "100px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/api/success_story/media/${data.image}`}
                                    style={{
                                        width: "80px",
                                        height: "45px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                    onError={(e) =>
                                        (e.target.src =
                                            "/images/default-thumbnail.jpg")
                                    }
                                />,
                            );
                        },
                    },
                    {
                        dataField: "visible",
                        caption: "Visible",
                        dataType: "boolean",
                        width: "120px",
                        cellTemplate: (container, { data }) => {
                            $(container).empty();
                            ReactAppend(
                                container,
                                <SwitchFormGroup
                                    checked={data.visible == 1}
                                    onChange={() =>
                                        onVisibleChange({
                                            id: data.id,
                                            value: !data.visible,
                                        })
                                    }
                                />,
                            );
                        },
                    },

                    {
                        caption: "Acciones",
                        width: "100px",
                        cellTemplate: (container, { data }) => {
                            container.append(
                                DxButton({
                                    className:
                                        "btn btn-xs btn-soft-primary me-1",
                                    title: "Editar",
                                    icon: "fa fa-pen",
                                    onClick: () => onModalOpen(data),
                                }),
                            );
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-danger",
                                    title: "Eliminar",
                                    icon: "fa fa-trash",
                                    onClick: () => onDeleteClicked(data.id),
                                }),
                            );
                        },
                    },
                ]}
            />

            <Modal
                modalRef={modalRef}
                title={
                    isEditing ? "Editar Caso de éxito" : "Nuevo Caso de éxito"
                }
                onSubmit={onModalSubmit}
                size="xl"
            >
                <input ref={idRef} type="hidden" />

                <div className="row" id="success-stories-container">
                    {/* Columna izquierda - Información del proyecto y empresa */}
                    <div className="col-md-4">
                        {/* Información del proyecto */}
                        <div className="card mb-4">
                            <div className="card-header">
                                <h6 className="mb-0">
                                    Información del Proyecto
                                </h6>
                            </div>
                            <div className="card-body">
                                <InputFormGroup
                                    eRef={category_projectRef}
                                    label="Categoría del proyecto"
                                    required
                                />
                                <InputFormGroup
                                    eRef={client_projectRef}
                                    label="Cliente del proyecto"
                                    required
                                />
                                <InputFormGroup
                                    eRef={date_start_projectRef}
                                    label="Fecha de inicio"
                                    type="date"
                                    required
                                />
                                <InputFormGroup
                                    eRef={date_end_projectRef}
                                    label="Fecha de finalización"
                                    type="date"
                                    required
                                />
                                <InputFormGroup
                                    eRef={durationRef}
                                    label="Duración del proyecto"
                                    type="text"
                                    required
                                />
                            </div>
                        </div>

                        {/* Información de la empresa */}
                        <div className="card">
                            <div className="card-header">
                                <h6 className="mb-0">
                                    Información de la Empresa
                                </h6>
                            </div>
                            <div className="card-body">
                                <ImageFormGroup
                                    eRef={company_logoRef}
                                    label="Logo de la empresa"
                                    aspect={16 / 9}
                                />
                                <InputFormGroup
                                    eRef={company_nameRef}
                                    label="Nombre de la empresa"
                                    required
                                />
                                <InputFormGroup
                                    eRef={company_summaryRef}
                                    label="Resumen de la empresa"
                                    required
                                />
                                <InputFormGroup
                                    eRef={company_percentageRef}
                                    label="Porcentaje de éxito"
                                    type="number"
                                    required
                                />
                                <InputFormGroup
                                    eRef={company_description_percentageRef}
                                    label="Descripción del porcentaje de éxito"
                                    required
                                />
                                <SelectAPIFormGroup
                                    eRef={servicesRef}
                                    searchAPI="/api/admin/services/paginate"
                                    searchBy="name"
                                    label="Servicios incluidos"
                                    dropdownParent="#success-stories-container"
                                    tags
                                    multiple
                                />
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha - Contenido principal */}
                    <div className="col-md-8">
                        {/* Información básica del caso de éxito */}
                        <div className="card mb-4">
                            <div className="card-header">
                                <h6 className="mb-0">Información General</h6>
                            </div>
                            <div className="card-body">
                                <ImageFormGroup
                                    eRef={imageRef}
                                    label="Imagen principal"
                                    aspect={16 / 9}
                                />
                                <InputFormGroup
                                    eRef={nameRef}
                                    label="Nombre del Caso de éxito"
                                    required
                                />
                                <InputFormGroup
                                    eRef={summaryRef}
                                    label="Resumen del Caso de éxito"
                                    required
                                />
                                <div className="mb-3">
                                    <label className="form-label">
                                        Descripción *
                                    </label>
                                    <textarea
                                        ref={descriptionRef}
                                        className="form-control"
                                        rows={4}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sección de beneficios */}
                        <div className="card mb-4">
                            <div className="card-header">
                                <h6 className="mb-0">Beneficios</h6>
                            </div>
                            <div className="card-body">
                                <InputFormGroup
                                    eRef={title_benefitsRef}
                                    label="Título de beneficios"
                                    required
                                />
                                <div className="mb-3">
                                    <label className="form-label">
                                        Descripción de beneficios *
                                    </label>
                                    <textarea
                                        ref={description_benefitsRef}
                                        className="form-control"
                                        rows={3}
                                        required
                                    />
                                </div>

                                <h6 className="mb-3">Lista de Beneficios</h6>
                                {benefits.map((benefit, index) => (
                                    <FeatureCard
                                        key={`benefit-${index}`}
                                        feature={benefit}
                                        index={index}
                                        onUpdate={updateBenefit}
                                        onRemove={removeBenefit}
                                        canRemove={benefits.length > 1}
                                        type="benefit"
                                        benefits={benefits}
                                        addBenefit={addBenefit}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Sección de desafíos y soluciones */}
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h6 className="mb-0 text-white">
                                    Desafíos y Soluciones
                                </h6>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <InputFormGroup
                                            eRef={title_challengesRef}
                                            label="Título del desafío"
                                            required
                                        />
                                        <div className="mb-4">
                                            <label className="form-label">
                                                Descripción del desafío *
                                            </label>
                                            <textarea
                                                ref={description_challengesRef}
                                                className="form-control"
                                                rows={3}
                                                required
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="mb-3">
                                                    Desafíos
                                                </h6>
                                                {challenges.map(
                                                    (char, index) => (
                                                        <FeatureCard
                                                            key={`challenge-${index}`}
                                                            feature={char}
                                                            index={index}
                                                            onUpdate={
                                                                updateChallenge
                                                            }
                                                            onRemove={
                                                                removeChallenge
                                                            }
                                                            canRemove={
                                                                challenges.length >
                                                                1
                                                            }
                                                            type="challenge"
                                                            challenges={
                                                                challenges
                                                            }
                                                            addChallenge={
                                                                addChallenge
                                                            }
                                                        />
                                                    ),
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="mb-3">
                                                    Soluciones
                                                </h6>
                                                {solutions.map(
                                                    (char, index) => (
                                                        <FeatureCard
                                                            key={`solution-${index}`}
                                                            feature={char}
                                                            index={index}
                                                            onUpdate={
                                                                updateSolution
                                                            }
                                                            onRemove={
                                                                removeSolution
                                                            }
                                                            canRemove={
                                                                solutions.length >
                                                                1
                                                            }
                                                            type="solution"
                                                            solutions={
                                                                solutions
                                                            }
                                                            addSolution={
                                                                addSolution
                                                            }
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <ImageFormGroup
                                            eRef={image_challengesRef}
                                            label="Imagen del desafío"
                                            aspect={9 / 16}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <LanguageProvider>
            <BaseAdminto {...properties} title="Casos de éxito">
                <SuccessStories {...properties} />
            </BaseAdminto>
        </LanguageProvider>,
    );
});

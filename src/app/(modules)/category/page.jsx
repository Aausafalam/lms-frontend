"use client";
import React, { useState } from "react";
import CategoryForm from "./components/form";
import CategoryTable from "./components/table";
import Modal from "@/components/Popup/Popup";
import GlobalICONS from "@/lib/utils/icons";
import CategoryDetails from "./components/details";

const Category = () => {
    const [show, setShow] = useState({});
    const [details, setDetails] = useState(null);
    const closeModal = () => setShow({ add: false, edit: false, delete: false });

    return (
        <div>
            <CategoryTable setDetails={setDetails} setShow={setShow} />
            <Modal
                show={show.add}
                onClose={closeModal}
                title={"Add Category"}
                maxWidth={"1200px"}
                icon={GlobalICONS.CATEGORY}
                description="Provide the required details to configure and register a new category"
            >
                <CategoryForm />
            </Modal>
            <Modal show={show.edit} onClose={closeModal} title={"Edit Category Details"} maxWidth={"1200px"} icon={GlobalICONS.CATEGORY} description="Edit the specified category details">
                <CategoryForm data={details} />
            </Modal>
            <Modal
                show={show.view}
                onClose={closeModal}
                title={"Category Details"}
                maxWidth={"1600px"}
                icon={GlobalICONS.CATEGORY}
                description="Provide the required details to configure and register a new Category"
            >
                <CategoryDetails data={details} />
            </Modal>
        </div>
    );
};

export default Category;

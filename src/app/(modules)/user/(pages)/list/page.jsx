"use client";
import MarkDownEditor from "@/components/form/components/FieldTemplates/TextAreaField/components/markDownEditor";
import UserTable from "./components/userTable";
import styles from "./index.module.css";
import { useState } from "react";
import CkEditor from "@/components/form/components/FieldTemplates/TextAreaField/components/ckeEditor";

export default function UserList() {
    const [content, setContent] = useState("");
    return (
        <div>
            <UserTable />
            {/* <MarkDownEditor />

            <CkEditor value={content} setValue={setContent} placeholder="Write your text here..." /> */}
        </div>
    );
}

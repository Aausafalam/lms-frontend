"use client";
import MarkDownEditor from "@/components/markDownEditor";
import UserTable from "./components/userTable";
import styles from "./index.module.css";

export default function UserList() {
    return (
        <div>
            <UserTable />
            <MarkDownEditor />
        </div>
    );
}

"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically Import CKEditor (Avoids SSR Issues)
const CKEditor = dynamic(() => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor), { ssr: false });

// Import ClassicEditor (Full Build)
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CkEditor = ({ id, name, value, onChange, onBlur, disabled, readOnly, placeholder, className, style, ariaInvalid, ariaDescribedby, config = {}, licenseKey = "", ...restProps }) => {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const editorRef = useRef(null);

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.isReadOnly = disabled || readOnly;
        }
    }, [disabled, readOnly]);

    return (
        <div className={`w-full ${className}`} style={style}>
            {editorLoaded ? (
                <CKEditor
                    id={id}
                    editor={ClassicEditor}
                    data={value || ""}
                    onReady={(editor) => {
                        editorRef.current = editor;
                        editor.isReadOnly = disabled || readOnly;
                    }}
                    onChange={(_, editor) =>
                        onChange?.({
                            target: { name, value: editor.getData() },
                        })
                    }
                    onBlur={onBlur}
                    config={{
                        licenseKey: "GPL" || "undefined",
                        placeholder: placeholder || "Type here...",
                        toolbar: [
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "underline",
                            "strikethrough",
                            "|",
                            "fontSize",
                            "fontColor",
                            "fontBackgroundColor",
                            "|",
                            "alignment",
                            "outdent",
                            "indent",
                            "|",
                            "bulletedList",
                            "numberedList",
                            "todoList",
                            "|",
                            "blockQuote",
                            "link",
                            "insertTable",
                            "mediaEmbed",
                            "codeBlock",
                            "|",
                            "imageUpload",
                            "undo",
                            "redo",
                            "|",
                            "subscript",
                            "superscript",
                            "highlight",
                            "|",
                            "horizontalLine",
                            "specialCharacters",
                            "removeFormat",
                        ],
                        table: {
                            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableProperties"],
                        },
                        image: {
                            toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
                        },
                        mediaEmbed: {
                            previewsInData: true,
                        },
                        codeBlock: {
                            languages: [
                                { language: "plaintext", label: "Plain text" },
                                { language: "javascript", label: "JavaScript" },
                                { language: "html", label: "HTML" },
                                { language: "css", label: "CSS" },
                                { language: "python", label: "Python" },
                            ],
                        },
                        ...config,
                    }}
                    aria-invalid={ariaInvalid}
                    aria-describedby={ariaDescribedby}
                    {...restProps}
                />
            ) : (
                <p>Loading editor...</p>
            )}
        </div>
    );
};

export default CkEditor;

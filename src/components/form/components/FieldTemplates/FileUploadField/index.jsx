import React, { useState, useCallback, useEffect, useRef } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import styles from "./index.module.css";

// Register all plugins
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileEncode,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
    FilePondPluginImageResize,
    FilePondPluginImageCrop,
    FilePondPluginImageTransform
);
const fileTypeMapping = {
    image: "image/*",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};
const FileUploadField = ({ formField, groupPreviewUrls, previewUrl, errors }) => {
    const {
        id,
        name,
        label,
        required = false,
        accept = ["image", "doc", "pdf", "docx"],
        disabled = false,
        readonly = false,
        groupIndex,
        fieldName,
        uploadFunction,
        onChange,
        groupFields,
        style,
        info_text,
        viewFile,
        multiple = false,
        maxFileSize = "5MB",
        maxFiles = 3,
        imagePreviewHeight = 400,
        imageCropAspectRatio = "1:1",
        imageResizeTargetWidth = 800,
        imageResizeTargetHeight = 800,
        imageResizeMode = "cover",
        imageQuality = 90,
    } = formField;

    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");
    const [touched, setTouched] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const pondRef = useRef(null);

    const handleValidation = useCallback(() => {
        if (required && files.length === 0 && touched) {
            setError("This field is required");
            return false;
        }
        setError("");
        return true;
    }, [required, files.length, touched]);

    useEffect(() => {
        handleValidation();
    }, [files, touched, handleValidation]);

    const handleProcessFile = useCallback(
        async (error, file) => {
            setTouched(true);
            if (error) {
                setError(error.message);
                return;
            }

            setIsUploading(true);
            try {
                const processedFile = {
                    id: file.id,
                    fileName: file.filename,
                    fileSize: file.fileSize,
                    fileType: file.fileType,
                    file: file.file,
                    fileLink: URL.createObjectURL(file.file),
                };

                setFiles((prevFiles) => {
                    const updatedFiles = multiple ? [...prevFiles, processedFile] : [processedFile];
                    // onChange?.(multiple ? updatedFiles : updatedFiles[0], groupIndex, fieldName);
                    return updatedFiles;
                });

                setError("");
            } catch (err) {
                setError(err.message);
            } finally {
                setIsUploading(false);
            }
        },
        [multiple, onChange, groupIndex, fieldName]
    );

    const handleRemoveFile = useCallback(
        (error, file) => {
            setFiles((prevFiles) => {
                const updatedFiles = prevFiles.filter((f) => f.id !== file.id);
                //  onChange?.(multiple ? updatedFiles : updatedFiles[0] || null, groupIndex, fieldName);
                return updatedFiles;
            });
        },
        [multiple, onChange, groupIndex, fieldName]
    );

    useEffect(() => {
        return () => {
            files.forEach((file) => {
                if (file.fileLink) {
                    URL.revokeObjectURL(file.fileLink);
                }
            });
        };
    }, [files]);
    // console.log(accept);

    return (
        <div className={styles.fileUploadContainer} style={style}>
            <div className={styles.labelWrapper}>
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
                {info_text && <span className={styles.infoText}>{info_text}</span>}
            </div>

            <FilePond
                ref={pondRef}
                id={id}
                name={name}
                disabled={disabled || readonly}
                allowMultiple={multiple}
                maxFiles={maxFiles}
                acceptedFileTypes={accept.map((type) => fileTypeMapping[type.trim()])}
                maxFileSize={maxFileSize}
                files={files.map((file) => ({
                    source: file.file,
                    options: {
                        type: "local",
                    },
                }))}
                onaddfile={handleProcessFile}
                onremovefile={handleRemoveFile}
                allowFileEncode={true}
                allowImageTransform={true}
                imagePreviewHeight={imagePreviewHeight}
                imageCropAspectRatio={imageCropAspectRatio}
                imageResizeTargetWidth={imageResizeTargetWidth}
                imageResizeTargetHeight={imageResizeTargetHeight}
                imageResizeMode={imageResizeMode}
                imageTransformOutputQuality={imageQuality}
                imageTransformOutputQualityMode="optional"
                instantUpload={false}
                labelIdle={`
                    <div class="${styles.file_upload_container}">
                        ${
                            !disabled
                                ? `
                                    <div
                                      
                                    >
                                        <span class="${styles.upload__icon}"> <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg></span>
                                    </div>
                                `
                                : ""
                        }
                        ${
                            !disabled
                                ? `
                                    <div class="${styles.drag__text}">
                                        <p>Drag & drop files here or click to browse</p>
                                        <p class="text-primary">Support for images, documents and other files up to 1MB each</p>
                                    </div>
                                `
                                : ""
                        }
                        ${required && touched && files.length === 0 ? `<span class="${styles.error}">This field is required</span>` : ""}
                    </div>
                `}
                className={`${styles.filePond} ${error ? styles.hasError : ""}`}
            />

            {error && <div className={styles.errorMessage}>{error}</div>}

            {files.length > 0 && (
                <div className={styles.fileList}>
                    {files.map((file) => (
                        <div key={file.id} className={styles.fileItem}>
                            <div className={styles.fileInfo}>
                                <span className={styles.fileName}>{file.fileName}</span>
                                <span className={styles.fileSize}>({(file.fileSize / 1024).toFixed(2)} KB)</span>
                            </div>
                            <div className={styles.fileActions}>
                                {viewFile && (
                                    <a href={file.fileLink} target="_blank" rel="noopener noreferrer" className={styles.viewButton}>
                                        View
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUploadField;

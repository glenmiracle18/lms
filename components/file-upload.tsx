import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";


interface FileUploadProps {
    endpoint: keyof typeof ourFileRouter;
    onChange: (url?: string) => void;
}

export const FileUpload = ({
    endpoint,
    onChange
}: FileUploadProps ) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
                toast.success("File uploaded");
            }}
            onUploadError={(error: Error) => {
                toast.error(`${error?.message}`);
            }}
        />
    )
}
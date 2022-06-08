import { useEffect, useState } from "react";
import { validateImage } from "image-validator";

const useValidateImage = (file) => {
    const [isImageValid, setIsImageValid] = useState(false);

    const validateImages = async () => {
        if (file === "") {
            return;
        }
        if (file === null || file === undefined) {
            return;
        }

        const isValidImage = await validateImage(file);
        setIsImageValid(isValidImage);
    };

    useEffect(() => {
        validateImages();
    }, [file]);

    return { isImageValid };
};

export default useValidateImage;

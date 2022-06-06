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
        console.log(file);
        const isValidImage = await validateImage(file);
        console.log(isValidImage);
        setIsImageValid(isValidImage);
    };

    useEffect(() => {
        validateImages();
    }, [file]);

    return { isImageValid };
};

export default useValidateImage;

const FormData = require("form-data");

const useGetFormData = () => {
    function getFormData(form) {
        const bodyFormData = new FormData();
        bodyFormData.append("title", form.elements["title"].value);
        bodyFormData.append("date_info", form.elements["date_info"].value);
        bodyFormData.append(
            "author",
            form.elements["author"].value.split(", ")
        );
        bodyFormData.append("publisher", form.elements["publisher"].value);
        bodyFormData.append("category", form.elements["category"].value);
        bodyFormData.append("language", form.elements["language"].value);
        bodyFormData.append("pages", form.elements["pages"].value);
        bodyFormData.append("description", form.elements["description"].value);
        bodyFormData.append("image", form.elements["image"].files[0]);

        return bodyFormData;
    }

    function getJsonData(form) {
        const data = {
            bid: new Date().getTime().toString(),
            title: form.elements["title"].value,
            data_info: form.elements["date_info"].value,
            author: form.elements["author"].value.split(", "),
            publisher: form.elements["publisher"].value,
            category: form.elements["category"].value,
            language: form.elements["language"].value,
            pages: form.elements["pages"].value,
            description: form.elements["description"].value,
            image: form.elements["image"].files[0],
        };
        return data;
    }

    return { getFormData, getJsonData };
};

export default useGetFormData;

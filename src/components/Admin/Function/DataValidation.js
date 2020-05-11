export default function DataValidation(data) {
    for (let key in data)
        if (key !== "artistCompany" && data[key] === "") {
            alert(key + " 입력하세요");
            return true;
        }

    return false;
}
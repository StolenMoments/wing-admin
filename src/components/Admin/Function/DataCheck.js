export default function DataCheck(data) {
    for (let key in data)
        if (key !== "artistCompany" && data[key] === "") {
            alert(key + " 입력하세요");
            return true;
        }

    return false;
}
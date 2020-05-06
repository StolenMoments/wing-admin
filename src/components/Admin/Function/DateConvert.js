export default function DateConvert(date) {
    const year = date.getFullYear();
    let month = date.getMonth();
    if (month < 10)
        month = '0' + month;

    let day = date.getDate();
    if (day < 10)
        day = '0' + day;

    return year + '-' + month + '-' + day;
}
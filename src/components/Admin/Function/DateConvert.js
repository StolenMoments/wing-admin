export default function DateConvert(date) {
    console.log(date)
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10)
        month = '0' + month;

    let day = date.getDate();
    if (day < 10)
        day = '0' + day;

    console.log("리턴 " + year + '-' + month + '-' + day)
    return year + '-' + month + '-' + day;
}
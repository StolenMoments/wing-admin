export default function(row, setList, setExistCheck, togglePopUp){
    for(let key in setList){
        if (!setList.hasOwnProperty(key)) continue;
        if (key === "debutDate" || key === "date") {
            setList[key](
                new Date(
                    row[key].substr(0, 4),
                    row[key].substr(5,2),
                    row[key].substr(8,2)
                )
            );
        }
        else setList[key](row[key]);
    }
    setExistCheck(true);
    togglePopUp();
}
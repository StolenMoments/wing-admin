export default function(row, setList, setExistCheck, togglePopUp, singers){
    for(let key in setList){
        if (!setList.hasOwnProperty(key) || key === "singers") continue;
        if (key === "debutDate" || key === "date") {
            setList[key](
                new Date(
                    row[key].substr(0, 4),
                    row[key].substr(5,2),
                    row[key].substr(8,2)
                )
            );
        }
        else if (key === "addSinger") {
            setList[key](singers + "/" + row.artistName);
        }
        else if (key === "artistList") {
            setList[key](row[key]);
            console.log("key : " + key + " " + row[key])
            
            
             row[key].map(obj => {
                 setList.singers(singers + "/" + obj.artistName);
                 console.log(obj.artistName + " singers : " + singers);
             })

        }
        else setList[key](row[key]);
    }
    setExistCheck(true);
    togglePopUp();
}
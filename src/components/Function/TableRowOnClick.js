export default function(row, inputs, setInputs, setExistCheck, setPopUp){
    for (let key in row) {
        if (inputs.hasOwnProperty(key)) {
            if (key === "debutDate") {
                inputs = {
                    ...inputs,
                    [key] : new Date(
                        row[key].substr(0, 4),
                        Number(row[key].substr(5, 2)) - 1,
                        row[key].substr(8, 2)
                    )
                }
            }
            else inputs = {
                ...inputs,
                [key]: row[key]
            }
        }
    }

    setInputs(inputs)
    setExistCheck(true);
    setPopUp();
}
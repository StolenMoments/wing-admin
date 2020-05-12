import { withStyles } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

export default withStyles({
    root: {
        textAlign: "center",
        fontFamily: "NanumBarunGothic, sansSerif",
        fontWeight: "700",
        fontSize: "24px"
    },
})(TableCell);
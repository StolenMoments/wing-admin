import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableRowOnClick from "../../Function/TableRowOnClick";
import Table from "@material-ui/core/Table";
import DefaultMessageDiv from "../../StyledComponents/DefaultMessageDiv";
import StyledTableCell from "../../CustomMui/StyledTableCell";

const AlbumCheckResultTable = ({ albums, inputs, setInputs, setExistCheck, setPopUp }) => {
    if (albums.length === 0)
        return <DefaultMessageDiv>검색 후, 해당 항목을 클릭하세요</DefaultMessageDiv>

    return albums.map(row =>
        (
            <Table key={row.albumId}>
                <TableBody key={row.albumId}>
                    <TableRow key={row.albumId}
                              hover
                              onClick={
                                  () => TableRowOnClick
                                  (
                                      row, inputs,
                                      setInputs, setExistCheck,
                                      setPopUp
                                  )
                              }
                    >
                        <StyledTableCell style={{width: "100px"}}>
                            <img
                                alt="profile" src={row.imageUri}
                                style={{ width: "100px", height: "100px" }}
                            />
                        </StyledTableCell>
                        <StyledTableCell width="250px">{row.albumName}</StyledTableCell>
                        <StyledTableCell width="250px">{row.company}</StyledTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    )
}

export default AlbumCheckResultTable
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableRowOnClick from "../../Function/TableRowOnClick";
import StyledTableCell from "../../CustomMui/StyledTableCell";
import DefaultMessageDiv from "../../StyledComponents/DefaultMessageDiv";

const ArtistCheckResultTable = ({ artists, inputs, setInputs, setExistCheck, setPopUp} ) => {

    if (artists.length === 0)
        return <DefaultMessageDiv>검색 후, 해당 항목을 클릭하세요</DefaultMessageDiv>

    return artists.map(row =>
        (
            <Table key={row.artistId}>
                <TableBody key={row.artistId}>
                    <TableRow key={row.artistId}
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
                        <StyledTableCell>
                            <img
                                alt="profile" src={row.imageUri}
                                style={{ width: "125px", height: "125px" }}
                            />
                        </StyledTableCell>
                        <StyledTableCell width="250px">{row.artistName}</StyledTableCell>
                        <StyledTableCell width="250px">{row.artistCompany}</StyledTableCell>
                        <StyledTableCell width="120px">{row.artistGenre}</StyledTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    )
};

export default ArtistCheckResultTable
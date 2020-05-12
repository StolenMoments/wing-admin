import { Button } from "@material-ui/core";
import React from "react";

export default ({ Post }) => {
    return (
        <Button style={{ paddingBottom: "3.7rem", borderRadius: "1rem", fontSize: "2rem", backgroundColor: "black", color: "white" }}
                size="large"
                onClick={() => Post()}>등 록 / 수 정</Button>
    )
}
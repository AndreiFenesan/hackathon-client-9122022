import React from "react";
import "./SearchAreaButtton.css"

export default function SearchAreaButton({onClick}) {
    return (
        <input type={"button"} className={"searchAreaButton"} onClick={onClick} value={"Search this area"}/>
    )
}
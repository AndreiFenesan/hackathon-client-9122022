import React from "react";
import './DeleteButton.css'
export default function DeleteButton({deleteClickHandler}){
    return <button className={"delete-card-button"}
                   onClick={deleteClickHandler}>
        <img className={"delete-card-icon"} src={"https://cdn-icons-png.flaticon.com/128/864/864393.png"}
             alt={"Close icon"}/>
    </button>
}
import React from "react";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

const Loading =()=>{
    return (
      <div className="loading">
        <Spinner size={50} color={"aqua"} speed={1}/>
      </div>
    )
}
export default Loading


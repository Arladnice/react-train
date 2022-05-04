import React from "react";
import cn from "./MyInput.module.css";

const MyInput = React.forwardRef((props, ref) => {
  return <input ref={ref} className={cn.myInput} type="text" {...props} />;
});

export default MyInput;

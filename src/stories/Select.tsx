import React from "react";
import { useState } from 'react';
interface SelectProps {
    mobileMode?: 'native' | 'popup',
    lists?:string[],
    placeholder?:string
}


export const Select = ({ mobileMode ='native',lists = ['0'],...props}: SelectProps)=>{
    const [selectOpen,setSelectOpen] = useState<boolean>(false)
    const [selectValue,setSelectValue] = useState<string>()

    return(
    <div className="">
        <div className="border shadow w-max py-1 px-1"><p>daasdsad</p><div className="w-0 h-0 
  border-l-[5px] border-l-transparent
  border-t-[7px] border-t-red-500
  border-r-[5px] border-r-transparent">
</div></div>

        {/* <select className="ring-0 h-9 shadow">

            {props.placeholder && <option  selected hidden disabled>{props.placeholder}</option>}
            {lists.map((item)=>{
                return (
                    
                    <option>{item}</option>
                )
            })}
        </select> */}
    </div>
    )
}
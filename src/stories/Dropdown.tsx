import React from "react";

interface DropdownProps {
    mobileMode?: 'native' | 'popup';
}


export const Dropdown = ({ mobileMode ='native',
...props
}: DropdownProps)=>{
    <div><Select><option value="">dd</option></Select></div>
}